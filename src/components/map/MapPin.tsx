import React from "react";
import { View, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";

// from app
import Images from "app/src/constants/Images";

interface Props {
  children: string;
  center?: boolean;
  location: {
    longitude: number;
    latitude: number;
    timestamp: number;
  };
  accuracy: number;
  onCalloutPress?: () => void;
}

/**
 * ピン付けマーカー
 * @author kotatanaka
 */
const MapPin: React.FC<Props> = (props: Props) => {
  const pinColor = props.center ? "black" : "red";

  return (
    <Marker coordinate={props.location} pinColor={pinColor}>
      {props.onCalloutPress && (
        <Callout tooltip onPress={props.onCalloutPress}>
          <View
            style={{
              padding: 8,
              borderRadius: 4,
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 10
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {props.children}
            </Text>
          </View>
        </Callout>
      )}
    </Marker>
  );
};

export default MapPin;
