import React from "react";
import MapView from "react-native-maps";

// from app
import { ILocation } from "app/src/interfaces/Map";
import { ISpot } from "app/src/interfaces/api/Plan";
import { simpleMapViewStyle } from "app/src/styles/map-component-style";

interface Props {
  spot: ISpot;
}

/**
 * シンプルなマップコンポーネント
 * @author kotatanaka
 */
const SimpleMapView: React.FC<Props> = (props: Props) => {
  const region: ILocation = {
    latitude: props.spot.latitude,
    longitude: props.spot.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.05
  };

  return <MapView region={region} style={simpleMapViewStyle.map} />;
};

export default SimpleMapView;
