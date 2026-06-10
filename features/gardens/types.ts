import type { Plant } from '../plants/types';

export type Garden = {
  id: string;
  name: string;
  width: number,
  length: number,
  light: string,
  soil: string,
  plants: [Plant]
}