/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Slider, Button, Overlay, CheckBox } from 'react-native-elements';
import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  Region,
} from 'react-native-maps';
import debounce from 'lodash/debounce';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Entypo } from '@expo/vector-icons';

// from app
import { ILocation, IPlace, IPlaceOpenHour } from 'app/src/interfaces/app/Map';
import { MapCircle } from 'app/src/components/MapItem';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { useGooglePlace } from 'app/src/hooks';
import { COLOR, SPOT_TYPE, LAYOUT } from 'app/src/constants';
import { PlanCard } from 'app/src/components/Element/dist/PlanCard';

import { ActionType } from 'app/src/Reducer';
import { useDispatch } from 'app/src/Store';
import { getDistance, getPreciseDistance } from 'geolib';

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

  const [radius, setRadius] = useState(50);
  const [openHours, setOpenHours] = useState<{ [key: string]: string }>({});
  const [currentOpHour, setCurrentOpHour] = useState('');
  const [spots, setSpots] = useState<IPlace[]>([]);
  const [typesPopup, setTypesPopup] = useState(false);
  const [spotChecked, setSpotChecked] = useState<boolean[]>([]);
  const [spotSaved, setSpotSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [place, setPlace] = useState({});

  const {
    // searchNearbyPlace,
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    // places,
    // setPlaces,
    API_KEY,
  } = useGooglePlace();

  const setCreateTempSpots = useCallback(() => {
    let tempSpots = [];
    spots.filter((item: any) => {
      let obj = {
        spotName: item['name'],
        address: item['vicinity'],
        rating: item['user_ratings_total'],
        imageUrl:
          item.photos && item.photos.length > 0
            ? getPlacePhoto(item.photos[0].photo_reference)
            : 'https://via.placeholder.com/120x90?text=No+Image',
        latitude: item['geometry']['location']['lat'],
        longitude: item['geometry']['location']['lng'],
        id: item['place_id'],
        heart: false,
        like: false,
        check: false,
        openinghour: '',
      };
      tempSpots.push(obj);
    });
    dispatch({
      type: ActionType.SET_CREATE_TEMP_SPOTS,
      payload: {
        tempSpots,
        location,
        radius,
      },
    });
  }, [spots, location, radius]);

  const onCompleteButtonPress = useCallback(() => {
    setCreateTempSpots();
    navigate('Flick');
    // console.log('complete');
  }, [setCreateTempSpots]);

  const mapRef = useRef(null);

  // map region changed
  const handleMapMoved = debounce((newRegion: Region) => {
    setLocation(newRegion);
  }, 100);

  function onRegionChange(newRegion: Region) {
    handleMapMoved(newRegion);
  }

  // Radius Change event
  const handleRadiusScroll = debounce((value: number) => {
    setRadius(value);
  }, 100);

  function onRadiusScroll(value: number) {
    handleRadiusScroll(value);
  }
  // Spot Photo and Operation Hour
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

  const formatOpHour = (value: string) =>
    `${value.slice(0, 2)}:${value.slice(2, 4)}`;

  function formatPlaceOpeningHours(opHour: IPlaceOpenHour) {
    if (opHour.periods) {
      const dayHour = opHour.periods[0];
      if (dayHour && dayHour.close) {
        return `${formatOpHour(dayHour.open.time)} - ${formatOpHour(
          dayHour.close.time,
        )}`;
      }

      return '24時間営業';
    }

    return '';
  }

  const getPhotoUrl = (place: IPlace) =>
    place.photos && place.photos.length > 0
      ? getPlacePhoto(place.photos[0].photo_reference)
      : 'https://via.placeholder.com/120x90?text=No+Image';

  // add Spot to recommend list
  async function onAddSpot(place: IPlace) {
    if (spots.indexOf(place) < 0) {
      setSpots((prev) => [...prev, place]);
      setPlace({});
      setSpotSaved(true);
    }
  }

  // get place detail on autocomplete
  async function onAutoComplete(details: any) {
    const detail = await getPlaceDetail(details.place_id);
    if (detail) {
      setModalVisible(true);
      setPlace(detail);
    }
  }

  const goPlace = () => {
    setLocation((prev) => {
      return {
        ...prev,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      };
    });
    setModalVisible(false);
  };
  const displayRadius = () => {
    let dis = getDistance(
      { latitude: location.latitude, longitude: location.longitude },
      {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
    );
    if (dis > 20000) {
      alert('so far');
    } else {
      let rad = Math.round(dis / 100);
      if (rad > radius) {
        setRadius(rad);
      }
    }
    setModalVisible(false);
  };
  // autoComplete Object
  const autoComplete = () => (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(details) => {
        onAutoComplete(details);
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
    />
  );

  const renderMarker = (place: any, color: string) => (
    <Marker
      description={place.name}
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      pinColor={color}
      key={place.id}
      onPress={() => onSpotPress(place)}
      onCalloutPress={() => onAddSpot(place)}
    >
      <Callout alphaHitTest>
        <View>
          <Text style={{ width: 200, flexWrap: 'wrap' }}>{place.name}</Text>
          <View
            style={{
              // display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
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
              <TouchableHighlight
                onPress={() => onAddSpot(place)}
                style={[thisStyle.calloutButton]}
              >
                <Text style={{ color: '#fff' }}>追加</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Callout>
    </Marker>
  );

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
        region={location}
        onRegionChange={onRegionChange}
        minZoomLevel={1}
        maxZoomLevel={13}
      >
        <MapCircle
          location={location}
          radius={radius * 100}
          color="#FFA50040"
        />
        {place.place_id ? renderMarker(place, 'orange') : null}
        {spots.map((place) => renderMarker(place, 'green'))}
      </MapView>
      <View
        style={{
          position: 'absolute',
          top: 20,
          width: '90%',
          marginHorizontal: '5%',
        }}
      >
        {autoComplete()}
      </View>
      <Overlay
        isVisible={typesPopup}
        windowBackgroundColor="rgba(0, 0, 0, .5)"
        overlayBackgroundColor="white"
        onBackdropPress={() => {
          setTypesPopup(false);
        }}
        width="auto"
        height={500}
      >
        <FlatList
          data={SPOT_TYPE}
          renderItem={({ item, index }) => (
            <CheckBox
              title={item.title}
              checked={spotChecked[index]}
              onPress={() => {
                const arrChecked = [...spotChecked];
                arrChecked[index] = !arrChecked[index];
                setSpotChecked(arrChecked);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Overlay>
      <View style={thisStyle.bottomPanel}>
        <View style={thisStyle.halfView}>
          <View style={{ flex: 1 }}>
            <View style={thisStyle.spotsContainer}>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>
                保存済みスポット
              </Text>
            </View>
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
          </View>
        </View>
        <View style={thisStyle.halfView}>
          <View>
            {spotSaved ? (
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
            ) : (
              <FlatList
                data={spots}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: getPhotoUrl(item) }}
                    style={[thisStyle.spotImage, { width: 40, height: 40 }]}
                    resizeMode="stretch"
                    key={item.place_id}
                  />
                )}
                horizontal
              />
            )}
          </View>
        </View>
        <View style={thisStyle.bottomPanelButton}>
          {spotSaved ? (
            <View style={thisStyle.buttonContainer}>
              <SmallCompleteButton
                title="スポツトを保存"
                onPress={() => setSpotSaved(!spotSaved)}
              />
            </View>
          ) : null}
          <View style={thisStyle.buttonContainer}>
            <SmallCompleteButton title="決定" onPress={onCompleteButtonPress} />
          </View>
        </View>
      </View>
      <Modal
        animationType={'slide'}
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
              width: LAYOUT.window.width * 0.5,
              height: LAYOUT.window.width * 0.3,
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
    </>
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
    height: 150,
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
    height: 40,
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
    width: 30,
    height: 30,
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
