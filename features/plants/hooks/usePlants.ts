import { plantsData } from '@/shared/constants/plants';

// Data access for plants. Reads the constants for now; swap these for real
// data loading later without touching the screens.
export function usePlants() {
  return plantsData;
}

export function usePlant(id?: string) {
  return plantsData.find(plant => plant.id === id);
}

export function usePlantsByIds(ids: string[]) {
  return plantsData.filter(plant => ids.includes(plant.id));
}
