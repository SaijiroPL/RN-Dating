import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

// from app
import { ILocation } from "app/src/interfaces/Map";
import { ISpot } from "app/src/interfaces/api/Plan";
import Colors from "app/src/constants/Colors";

interface Props {
  spot: ISpot;
}

/**
 * シンプルなマップコンポーネント
 * @author kotatanaka
 */
export const SimpleMapView: React.FC<Props> = (props: Props) => {
  const region: ILocation = {
    latitude: props.spot.latitude,
    longitude: props.spot.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.05
  };

  return <MapView region={region} style={thisStyle.map} />;
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  map: {
    borderColor: Colors.inactiveColor,
    borderRadius: 10,
    borderWidth: 1,
    height: 200,
    marginHorizontal: 10
    // marginVertical: 5
  }
});
