import { BLEDevice, OnboardingStatus } from "@/features/ble/types";
import { useCallback, useRef, useState } from "react";
import { deviceOnboardingService } from "../services/DeviceOnboardingService";
import type { UseDeviceOnboardingReturn, WiFiNetwork } from "../types";

// ─── useDeviceOnboarding ────────────────────────────────────────────────────────────
/**
 * Exposes the onboarding flow as simple state + actions.
 * The screen layer only ever imports from this hook — no BLE concepts reach the UI.
 */
export function useDeviceOnboarding(): UseDeviceOnboardingReturn {
  const [state, setState] = useState<OnboardingStatus>({ status: "idle" });
  const [availableNetworks, setAvailableNetworks] = useState<WiFiNetwork[]>([]);

  // Track the found device between steps
  const deviceRef = useRef<BLEDevice | null>(null);

  // ─── Scan for BLE device ───────────────────────────────────────────────────
  const startScan = useCallback(async () => {
    setState({ status: "scanning" });
    try {
      const device = await deviceOnboardingService.scanForDevice();
      deviceRef.current = device;
      // Immediately move to connecting after finding a device
      await selectDevice(device);
    } catch (error: any) {
      setState({
        status: "error",
        message: error.message,
        recoverable: true,
      });
    }
  }, []);

  // ─── Connect to a specific device ─────────────────────────────────────────
  const selectDevice = useCallback(async (device: BLEDevice) => {
    setState({ status: "connecting", deviceId: device.id });
    try {
      await deviceOnboardingService.connectToDevice(device.id);
      setState({ status: "connected", deviceId: device.id });
    } catch (error: any) {
      setState({
        status: "error",
        message: `Could not connect to device: ${error.message}`,
        recoverable: true,
      });
    }
  }, []);

  // ─── Fetch nearby WiFi networks ────────────────────────────────────────────
  const fetchNetworks = useCallback(async () => {
    try {
      const networks = await deviceOnboardingService.getAvailableNetworks();
      setAvailableNetworks(networks);
    } catch (error: any) {
      setState({
        status: "error",
        message: `Could not fetch networks: ${error.message}`,
        recoverable: true,
      });
    }
  }, []);

  // ─── Send WiFi credentials ─────────────────────────────────────────────────
  const connectToWiFi = useCallback(async (ssid: string, password: string) => {
    setState({ status: "sending_credentials" });

    const result = await deviceOnboardingService.sendWiFiCredentials(
      ssid,
      password,
      (step) => {
        if (step === "connecting") {
          setState({ status: "awaiting_confirmation" });
        }
      }
    );

    if (result.success) {
      setState({
        status: "success",
        networkName: result.networkName ?? ssid,
      });
    } else {
      setState({
        status: "error",
        message: result.error ?? "Failed to connect to WiFi",
        recoverable: true,
      });
    }
  }, []);

  // ─── Cancel ───────────────────────────────────────────────────────────────
  const cancel = useCallback(async () => {
    await deviceOnboardingService.cancel();
    setState({ status: "idle" });
    setAvailableNetworks([]);
    deviceRef.current = null;
  }, []);

  // ─── Reset ────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setState({ status: "idle" });
    setAvailableNetworks([]);
    deviceRef.current = null;
  }, []);

  return {
    state,
    availableNetworks,
    startScan,
    selectDevice,
    fetchNetworks,
    connectToWiFi,
    cancel,
    reset,
  };
}