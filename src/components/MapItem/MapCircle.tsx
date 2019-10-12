import React from "react";
import { Circle } from "react-native-maps";

interface Props {
  location: {
    longitude: number;
    latitude: number;
  };
  color: string;
  radius: number;
}

/**
 * 範囲円
 * @author kotatanaka
 */
const MapCircle: React.FC<Props> = (props: Props) => {
  const { location } = props;

  return (
    <Circle
      center={{
        latitude: location.latitude,
        longitude: location.longitude
      }}
      strokeColor="transparent"
      fillColor={props.color}
      radius={props.radius}
    />
  );
};

export default MapCircle;
