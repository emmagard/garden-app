import { gardensData } from '@/shared/constants/gardens';

// Data access for gardens. Reads the constants for now; swap these for real
// data loading later without touching the screens.
export function useGardens() {
  return gardensData;
}

export function useGarden(id?: string) {
  return gardensData.find(garden => garden.id === id);
}
