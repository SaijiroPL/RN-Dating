import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

// from app
import { ILocation, IHere, IMarker, ILine } from 'app/src/interfaces/app/Map';
import { MapCircle, MapHere, MapPin } from 'app/src/components/MapItem';
import { CompleteButton } from 'app/src/components/Button';

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
    longitudeDelta: 0.02757163010454633,
  });
  const [accuracy, setAccuracy] = useState<number>(65);
  // prettier-ignore
  const [here, setHere] = useState<IHere>({ latitude: 0, longitude: 0, timestamp: 0 });
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [markers, setMarkers] = useState<Array<IMarker>>([]);
  // prettier-ignore
  const [editMarkers, setEditMarker] = useState<IMarker>({ latitude: 0, longitude: 0, radius: 0, color: "", unit: "km" });
  const [distanceMode, setDistanceMode] = useState<boolean>(false);
  const [lines, setLines] = useState<Array<ILine>>([]);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [pinCount, setPinCount] = useState<number>(0);

  const onCompleteButtonPress = useCallback(() => {
    navigate('flick');
  }, []);

  const mapRef = useRef(null);

  const onMapPress = useCallback(
    ({ nativeEvent }) => {
      const { coordinate = {}, action = null } = nativeEvent;

      if (!action) {
        const region: ILocation = {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        };

        // mapRef.current.animateToRegion(region, 100);
        setLocation(region);
      }
    },
    [location, setLocation],
  );

  const onRegionChangeComplete = useCallback(
    (region: ILocation) => setLocation(region),
    [setLocation],
  );

  const onDistancePress = useCallback(() => {
    if (markers.length >= 2) {
      setDistanceMode((currentState) => !currentState);
    } else {
      Alert.alert('距離計測', 'ピンが2つ必要です');
    }
  }, [markers, setDistanceMode]);

  // prettier-ignore
  const onAddButtonPress = useCallback((marker?: IMarker | null) => {
    setDistanceMode(false);

    setEditMarker(
      marker && marker.key
        ? marker
        : {
            latitude: location.latitude,
            longitude: location.longitude,
            // TODO
            radius: 0,
            // TODO
            color: "#000",
            // TODO
            unit: "km"
          }
    );

    setModalVisible(true);
  }, [location, setDistanceMode, setModalVisible]);

  const onLocationButtonPress = useCallback(() => {
    setDistanceMode(false);

    if (!here.latitude || !here.longitude) {
      Alert.alert('位置情報無効', '位置情報を有効にしてください');
    } else {
      // TODO
    }
  }, [here, setDistanceMode]);

  // prettier-ignore
  const onCenterPinCalloutPress = useCallback(() => onAddButtonPress(), [onAddButtonPress]);
  // prettier-ignore
  const onMarkerPinCalloutPress = useCallback((marker: IMarker) => onAddButtonPress(marker), [onAddButtonPress]);
  // prettier-ignore
  const onSearchFocus = useCallback(() => setDistanceMode(false), [setDistanceMode]);

  const onSearchSubmit = useCallback(() => {
    if (keyword) {
      Location.geocodeAsync(keyword).then((r) => {
        if (r.length) {
          const region: ILocation = {
            latitude: r[0].latitude,
            longitude: r[0].longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          };

          setLocation(region);

          // mapRef.current.animateToRegion(region, 1);
        } else {
          // TODO if no result
        }
      });
    }
  }, []);

  const onPinDelete = useCallback(
    (marker: IMarker) => {
      // prettier-ignore
      setMarkers(markers.filter(m => !(m.latitude === marker.latitude && m.longitude === marker.longitude)))
    },
    [markers, setMarkers],
  );

  const onPinCreate = useCallback(
    (marker: IMarker) => {
      if (marker.key) {
        setMarkers(
          markers.map((m) => {
            // prettier-ignore
            if (m.latitude === marker.latitude && m.longitude === marker.longitude ) {
            return {
              ...m,
              key: `${marker.longitude + marker.latitude + accuracy + marker.radius}`,
              radius: marker.radius,
              color: marker.color
            };
          }

            return m;
          }),
        );
      } else {
        setMarkers([
          ...markers,
          {
            ...marker,
            // prettier-ignore
            key: `${marker.longitude + marker.latitude + accuracy + marker.radius}`
          },
        ]);

        setPinCount((currentState) => currentState + 1);
      }
    },
    [markers, setMarkers, setPinCount],
  );

  const onLinePress = useCallback((i = 0) => {
    setActiveLine(i);
  }, []);

  useEffect(() => {
    // TODO
  }, []);

  useEffect(() => {
    // TODO
  }, []);

  useEffect(() => {
    // TODO
  }, []);

  const delta = useMemo(
    () =>
      location.latitudeDelta > location.longitudeDelta
        ? location.latitudeDelta
        : location.longitudeDelta,
    [location],
  );

  /** マーカー */
  const Markers = markers.map((marker) => (
    <MapPin
      key={marker.key}
      location={{
        latitude: marker.latitude,
        longitude: marker.longitude,
        timestamp: 0,
      }}
      accuracy={accuracy}
    >
      MapPin
    </MapPin>
  ));

  /** 円 */
  const Circle =
    !distanceMode &&
    markers.map((marker) => (
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
          timestamp: 0,
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
            longitude: here.longitude,
          },
          {
            latitude: location.latitude,
            longitude: location.longitude,
          },
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
        onPress={onMapPress}
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
    height: '100%',
  },
});

export default SearchMapScreen;
