import { Image } from 'expo-image';

const heightIcons: Record<string, number> = {
  short: require('@/assets/short.svg'),
  medium: require('@/assets/medium.svg'),
  tall: require('@/assets/tall.svg'),
};

function PlantHeightIcon({ height }: { height: string }) {
  const icon = heightIcons[height];

  if (!icon) return null;

  return (
    <Image
      source={icon}
      style={{ width: 22, height: 18 }}
      accessible={true}
      accessibilityLabel={`Height: ${height}`}
    />
  );
}

export default PlantHeightIcon;
