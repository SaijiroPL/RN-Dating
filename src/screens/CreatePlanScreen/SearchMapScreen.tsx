/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, View, Text, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Slider } from 'react-native-elements';
import MapView, {
  Marker,
  Callout,
  Circle,
  CalloutSubview,
  Region,
  LatLng,
} from 'react-native-maps';

import debounce from 'lodash/debounce';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// from app
import { ILocation, IPlace } from 'app/src/interfaces/app/Map';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { useGooglePlace } from 'app/src/hooks';
import { COLOR, LAYOUT } from 'app/src/constants';

import { ActionType } from 'app/src/Reducer';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { getDistance, earthRadius } from 'geolib';
import { FontAwesome5 } from '@expo/vector-icons';

/** マップからスポット範囲指定画面 */
const SearchMapScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState<ILocation>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
    latitudeDelta: 0.038651027332100796,
    longitudeDelta: 0.02757163010454633,
  });

  const [center, setCenter] = useState<LatLng>({
    latitude: 35.658606737323325,
    longitude: 139.69814462256613,
  } as LatLng);

  const [radius, setRadius] = useState(10);
  const [openHours, setOpenHours] = useState<{ [key: string]: string }>({});
  const [currentOpHour, setCurrentOpHour] = useState('');
  const [spots, setSpots] = useState<IPlace[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState<IPlace | null>(null);
  const [searching, setSearching] = useState(false);

  const {
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    formatPlaceOpeningHours,
    API_KEY,
  } = useGooglePlace();

  const mapRef = useRef(null);
  const createPlan = useGlobalState('createPlan');

  function onCompleteButtonPress() {
    dispatch({
      type: ActionType.SET_CREATE_PLAN,
      payload: {
        ...createPlan,
        spots: [...spots],
        center,
        radius,
      },
    });
    navigate('Flick');
  }

  // map region changed
  const handleMapMoved = debounce((newRegion: Region) => {
    setLocation(newRegion);
    const newCenter = {
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    } as LatLng;
    setCenter(newCenter);
  }, 100);

  function onRegionChange(newRegion: Region) {
    handleMapMoved(newRegion);
  }

  // Radius Change event
  function onRadiusScroll(value: number) {
    handleRadiusScroll(value);
  }

  const handleRadiusScroll = debounce((value: number) => {
    setRadius(value);
  }, 100);

  const deg2rad = (angle: number) => (angle / 180) * Math.PI;
  const rad2deg = (angle: number) => (angle / Math.PI) * 180;

  useEffect(() => {
    const radiusInRad = (radius * 2.2 * 100) / earthRadius;
    const lngDelta = rad2deg(
      radiusInRad / Math.cos(deg2rad(location.latitude)),
    );
    const latDelta = rad2deg(radiusInRad);
    setLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      longitudeDelta: lngDelta,
      latitudeDelta: latDelta,
    } as ILocation);
  }, [radius]);

  // Autocomplete
  async function onAutoComplete(details: any) {
    const detail = await getPlaceDetail(details.place_id);
    if (detail) {
      setModalVisible(true);
      setPlace(detail);
    }
  }

  const autoComplete = () => (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(details) => {
        onAutoComplete(details);
        setSearching(false);
      }}
      query={{
        key: API_KEY,
        language: 'ja',
      }}
      styles={{
        container: thisStyle.headerContainer,
        textInputContainer: thisStyle.headerTextInputContainer,
        textInput: thisStyle.headerTextInput,
        listView: thisStyle.headerListView,
        powered: {
          height: 0,
        },
        poweredContainer: {
          height: 0,
        },
      }}
      textInputProps={{
        onFocus: () => setSearching(true),
        onBlur: () => setSearching(false),
      }}
    />
  );

  const goPlace = () => {
    if (place) {
      setLocation((prev) => {
        return {
          ...prev,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        };
      });
      setCenter({
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      } as LatLng);
    }
    setModalVisible(false);
  };
  const displayRadius = () => {
    if (place) {
      const dis = getDistance(
        { latitude: location.latitude, longitude: location.longitude },
        {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      );
      console.log(place.user_ratings_total);
      if (dis < 50000) {
        setPlaces((prev) => [...prev, place]);
        const rad = Math.round(dis / 100);
        if (rad > radius) {
          setRadius(rad);
        }
      }
    }
    setModalVisible(false);
  };
  // Marker related actions
  const getPhotoUrl = (place: IPlace) =>
    place.photos && place.photos.length > 0
      ? getPlacePhoto(place.photos[0].photo_reference)
      : 'https://via.placeholder.com/120x90?text=No+Image';

  async function onAddSpot(place: IPlace) {
    console.log('onAdd');
    if (spots.indexOf(place) < 0) {
      setSpots((prev) => [...prev, place]);
    }
  }
  async function onSpotPress(place: IPlace) {
    if (!openHours[place.place_id]) {
      const openHours = await getPlaceOpeningHours(place.place_id);
      if (openHours) {
        setOpenHours((prev) => {
          const obj = prev;
          obj[place.place_id] = formatPlaceOpeningHours(openHours);

          return obj;
        });
        setCurrentOpHour(formatPlaceOpeningHours(openHours));
      }
    } else {
      setCurrentOpHour(openHours[place.place_id]);
    }
  }
  const renderMarker = (place: IPlace, color: string) => (
    <Marker
      description={place.name}
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      pinColor={color}
      key={place.place_id}
      onPress={() => onSpotPress(place)}
    >
      <View>
        <FontAwesome5 name="map-marker" size={30} color={color} />
        <View style={{ position: 'absolute', top: 5, left: 4 }}>
          <Image
            source={{ uri: place.icon }}
            style={{ width: 15, height: 15 }}
          />
        </View>
      </View>
      <Callout alphaHitTest>
        <View
          style={{
            width: 220,
            height: 110,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ width: 200, flexWrap: 'wrap' }}>{place.name}</Text>
          <View
            style={{
              // display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              marginRight: 5,
            }}
          >
            <Text>
              <Image
                source={{
                  uri: getPhotoUrl(place),
                }}
                style={{ width: 120, height: 90 }}
                resizeMode="stretch"
              />
            </Text>
            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
              <Text>営業時間</Text>
              <Text style={{ width: 100 }}>{currentOpHour}</Text>

              <CalloutSubview
                key="test"
                onPress={() => onAddSpot(place)}
                style={[thisStyle.calloutButton]}
              >
                <Text style={{ color: '#fff' }}>追加</Text>
              </CalloutSubview>
            </View>
          </View>
        </View>
      </Callout>
    </Marker>
  );

  return (
    <View>
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
        region={location}
        onRegionChange={onRegionChange}
        mapPadding={{ top: 20, left: 0, right: 0, bottom: 40 }}
      >
        <Circle
          key="center"
          center={center}
          strokeColor="transparent"
          fillColor="#FFA50040"
          radius={radius * 100}
        />
        {places.map((place) => renderMarker(place, 'orange'))}
        {spots.map((place) => renderMarker(place, 'green'))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: 20,
          width: '90%',
          marginHorizontal: '5%',
          opacity: searching ? 1 : 0.5,
        }}
      >
        {autoComplete()}
      </View>
      <View style={thisStyle.bottomPanel}>
        <View style={thisStyle.halfView}>
          <View style={{ flex: 1 }}>
            <View style={thisStyle.spotsContainer}>
              <Text style={{ fontSize: 10, marginLeft: 10, marginBottom: 10 }}>
                保存済みスポット
              </Text>
            </View>
            <FlatList
              data={spots}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: getPhotoUrl(item) }}
                  style={thisStyle.spotImage}
                  resizeMode="stretch"
                  key={item.place_id}
                />
              )}
              horizontal
            />
          </View>
          <View style={{ flex: 1 }}>
            <Slider
              value={radius}
              minimumValue={0}
              maximumValue={200}
              thumbStyle={{ width: 10, height: 10, backgroundColor: '#000' }}
              trackStyle={{ height: 1 }}
              onValueChange={onRadiusScroll}
              style={{ marginLeft: 20, marginRight: 20 }}
            />
            <View style={thisStyle.buttonContainer}>
              <SmallCompleteButton
                onPress={onCompleteButtonPress}
                title="決定"
              />
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              width: LAYOUT.window.width * 0.55,
              height: LAYOUT.window.width * 0.4,
              backgroundColor: COLOR.backgroundColor,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={thisStyle.headerTextInput}>
              どのように使用しますか?
            </Text>
            <View style={thisStyle.buttonContainer}>
              <SmallCompleteButton title="円の中心" onPress={goPlace} />
            </View>
            <View style={thisStyle.buttonContainer}>
              <SmallCompleteButton
                title="スポット表示"
                onPress={displayRadius}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  map: {
    height: '100%',
  },
  bottomPanel: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
  },
  halfView: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomPanelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 5,
  },
  spotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: COLOR.tintColor,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 10,
    zIndex: 10,
  },
  spotImage: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  headerContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  headerTextInputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // backgroundColor: '#000',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  headerTextInput: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 2,
    height: 38,
    margin: 'auto',
    // color: '#5d5d5d',
    fontSize: 16,
  },
  headerListView: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginTop: 2,
  },
});

export default SearchMapScreen;
