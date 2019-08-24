import React from "react";
import MapView from "react-native-maps";

// from app
import { Location } from "app/src/types/TMap";
import { Spot } from "app/src/types/api/TSpot";
import { simpleMapViewStyle } from "app/src/styles/map-component-style";

interface Props {
  spot: Spot;
}

/**
 * シンプルなマップコンポーネント
 * @author kotatanaka
 */
const SimpleMapView: React.FC<Props> = (props: Props) => {
  const region: Location = {
    latitude: props.spot.latitude,
    longitude: props.spot.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.05
  };

  return <MapView region={region} style={simpleMapViewStyle.map} />;
};

export default SimpleMapView;
