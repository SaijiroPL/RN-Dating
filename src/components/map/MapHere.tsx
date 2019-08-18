import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

// from app
import Images from "app/src/constants/Images";

interface Props {
  location: {
    longitude: number;
    latitude: number;
    timestamp: number;
  };
  accuracy: number;
  delta: number;
}

/**
 * 現在位置のマーカー
 * @author kotatanaka
 */
const MapHere: React.FC<Props> = (props: Props) => {
  const { location, accuracy, delta } = props;

  if (!location.longitude || !location.latitude) {
    return null;
  }

  const key = (
    location.longitude +
    location.latitude +
    accuracy +
    location.timestamp +
    3000 * delta
  ).toString();

  return (
    <Marker key={key} coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
      <Image source={Images.logo} style={{ width: 64, height: 64 }} />
    </Marker>
  );
};

export default MapHere;
