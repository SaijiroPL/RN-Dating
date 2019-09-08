import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import MapView, { Polyline } from "react-native-maps";

// from app
import { ILocation, IHere, IMarker } from "app/src/interfaces/Map";
import Colors from "app/src/constants/Colors";
import MapCircle from "app/src/components/map/MapCircle";
import MapHere from "app/src/components/map/MapHere";
import MapPin from "app/src/components/map/MapPin";
import CompleteButton from "app/src/components/buttons/CompleteButton";

const locationInitialRound = 700;

/**
 * マップからスポット範囲指定画面
 * @author kotatanaka
 */
const SearchMapScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [location, setLocation] = useState<ILocation>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
    latitudeDelta: 0.038651027332100796,
    longitudeDelta: 0.02757163010454633
  });
  const [here, setHere] = useState<IHere>({
    latitude: 0,
    longitude: 0,
    timestamp: 0
  });
  const [accuracy, setAccuracy] = useState<number>(65);
  const [markers, setMarkers] = useState<Array<IMarker>>([]);
  const [lines, setLines] = useState<
    Array<{ latitude: number; longitude: number }>
  >([]);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [distanceMode, setDistanceMode] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const onCompleteButtonPress = () => {
    navigate("flick");
  };

  const mapRef = useRef(null);

  const delta =
    location.latitudeDelta > location.longitudeDelta
      ? location.latitudeDelta
      : location.longitudeDelta;

  /** マーカー */
  const Markers = markers.map(marker => (
    <MapPin
      key={marker.key}
      location={{
        latitude: marker.latitude,
        longitude: marker.longitude,
        timestamp: 0
      }}
      accuracy={accuracy}
    >
      MapPin
    </MapPin>
  ));

  /** 円 */
  const Circle =
    !distanceMode &&
    markers.map(marker => (
      <MapCircle
        key={marker.key}
        location={marker}
        color={marker.color}
        radius={marker.radius}
      />
    ));

  /** 現在位置 */
  const Here = <MapHere location={here} accuracy={accuracy} delta={delta} />;

  /** 中央 */
  const CenterPin =
    !distanceMode && !isModalVisible ? (
      <MapPin
        center
        location={{
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: 0
        }}
        accuracy={accuracy}
      >
        MapPin
      </MapPin>
    ) : null;

  /** ライン */
  const Line =
    here.timestamp && !distanceMode && !isModalVisible ? (
      <Polyline
        key={(
          here.longitude +
          here.latitude +
          location.longitude +
          location.latitude +
          accuracy +
          here.timestamp +
          3000 * delta
        ).toString()}
        coordinates={[
          {
            latitude: here.latitude,
            longitude: here.longitude
          },
          {
            latitude: location.latitude,
            longitude: location.longitude
          }
        ]}
        strokeWidth={2}
        strokeColor="rgba(0,0,0,0.3)"
      />
    ) : null;

  return (
    <>
      <MapView
        testID="mapView"
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        style={thisStyle.map}
        ref={mapRef}
        initialRegion={location}
        // onPress={onMapPress}
        // onRegionChangeComplete={onRegionChangeConplete}
      >
        {Line}
        {Here}
        {Markers}
        {Circle}
        {CenterPin}
        {/* Lines */}
        {/* Distance */}

        {/* TODO 完了ボタンを右下に配置したい */}
        <CompleteButton title="決定" onPress={onCompleteButtonPress} />
      </MapView>
      {/* TODO MapHeader */}
    </>
  );
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

export default SearchMapScreen;
