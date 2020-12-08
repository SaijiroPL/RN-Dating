/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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
import Autocomplete from 'react-native-autocomplete-input';
import { FontAwesome5 } from '@expo/vector-icons';
// from app
import {
  ILocation,
  IPlace,
  IGooglePrediection,
} from 'app/src/interfaces/app/Map';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { useGooglePlace } from 'app/src/hooks';
import {
  COLOR,
  LAYOUT,
  SPOT_TYPE,
  getTypeIndex,
  getIconUrl,
} from 'app/src/constants';

import { ActionType } from 'app/src/Reducer';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { getDistance, earthRadius } from 'geolib';

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
  const [queryText, setQueryText] = useState('');

  const {
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    formatPlaceOpeningHours,
    getAutoComplete,
    predictions,
    setPredictions,
  } = useGooglePlace();

  const mapRef = useRef(null);
  const markerRef = useRef<{ [key: string]: Marker | null }>({});
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
  // const handleQuery = debounce((input: string) => {
  //   getAutoComplete(input, center, radius);
  // }, 50);

  async function onChangeQuery(query: string) {
    getAutoComplete(query, center, radius);
    setQueryText(query);
  }

  async function onAutoComplete(details: IGooglePrediection) {
    const detail = await getPlaceDetail(details.place_id);
    if (detail) {
      onChangeQuery('');
      setModalVisible(true);
      setPlace(detail);
    }
  }

  const autoComplete = () => (
    <Autocomplete
      containerStyle={thisStyle.headerContainer}
      inputContainerStyle={thisStyle.headerTextInputContainer}
      data={predictions}
      onChangeText={(text) => onChangeQuery(text)}
      renderTextInput={(props) => (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
            placeholder="検索"
            style={{
              flex: 1,
              padding: 0,
              paddingBottom: 5,
              paddingTop: 5,
              fontSize: 18,
              color: 'black',
              marginLeft: 5,
              marginRight: 10,
              marginTop: 7,
              marginBottom: 5,
              backgroundColor: 'white',
            }}
            onChangeText={(text) => onChangeQuery(text)}
            value={queryText}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 5,
            }}
            onPress={() => onChangeQuery('')}
          >
            <FontAwesome5 name="times" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{ display: 'flex', flexDirection: 'row' }}
          onPress={() => onAutoComplete(item)}
        >
          <View style={{ paddingLeft: 10, paddingTop: 7 }}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'darkgrey',
                borderRadius: 15,
                alignItems: 'center',
              }}
            >
              <View style={{ marginTop: 5 }}>
                <FontAwesome5 name="map-marker-alt" size={20} color="white" />
              </View>
            </View>
            <Text style={{ color: 'grey', marginTop: 2 }}>
              {item.distance_meters > 1000
                ? `${(item.distance_meters / 1000).toFixed(1)}km`
                : `${item.distance_meters}m`}
            </Text>
          </View>
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 16, marginTop: 5 }}>
              {item.structured_formatting.main_text}
            </Text>
            <Text style={{ color: 'grey', marginTop: 10 }}>
              {item.structured_formatting.secondary_text}
            </Text>
          </View>
        </TouchableOpacity>
      )}
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
      setPlaces((prev) => [...prev, place]);
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
      if (dis < 4000) {
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
      onCalloutPress={() => {
        markerRef.current[place.place_id]?.hideCallout();
      }}
      ref={(_marker) => {
        markerRef.current[place.place_id] = _marker;
      }}
    >
      <View>
        <FontAwesome5 name="map-marker" size={30} color={color} />
        <View style={{ position: 'absolute', top: 5, left: 4 }}>
          {getIconUrl(place) != null ? (
            <Image
              source={getIconUrl(place)}
              style={{ width: 15, height: 15 }}
            />
          ) : (
            <Image
              source={{ uri: place.icon }}
              style={{ width: 15, height: 15 }}
            />
          )}
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
                onPress={() => {
                  onAddSpot(place);
                  markerRef.current[place.place_id]?.hideCallout();
                }}
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
          // opacity: searching ? 1 : 0.5,
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
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: '25%',
                  top: '30%',
                  height: '20%',
                  borderColor: 'grey',
                  borderWidth: 0.5,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '10%',
                  height: '40%',
                  borderColor: 'grey',
                  borderWidth: 0.5,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '75%',
                  top: '-10%',
                  height: '60%',
                  borderColor: 'grey',
                  borderWidth: 0.5,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: '100%',
                  top: '-30%',
                  height: '80%',
                  borderColor: 'grey',
                  borderWidth: 0.5,
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  left: '20%',
                  top: '50%',
                  fontSize: 8,
                }}
              >
                1km
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '45%',
                  top: '50%',
                  fontSize: 8,
                }}
              >
                2km
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '70%',
                  top: '50%',
                  fontSize: 8,
                }}
              >
                3km
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '95%',
                  top: '50%',
                  fontSize: 8,
                }}
              >
                4km
              </Text>
              <Slider
                value={radius}
                minimumValue={0}
                maximumValue={40}
                thumbStyle={{
                  width: 10,
                  height: 10,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  borderColor: 'orange',
                  borderWidth: 2,
                }}
                trackStyle={{ height: 1 }}
                onValueChange={onRadiusScroll}
              />
            </View>

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
    // padding: 5,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
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
