/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Image, View, Text, FlatList } from 'react-native';
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
import { ILocation } from 'app/src/interfaces/app/Map';
import { MapCircle } from 'app/src/components/MapItem';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { googlePlace, IPlace, IPlaceOpenHour } from 'app/src/hooks';
import { COLOR, SPOT_TYPE } from 'app/src/constants';

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
  // const [accuracy, setAccuracy] = useState<number>(65);
  // // prettier-ignore
  // const [here, setHere] = useState<IHere>({ latitude: 0, longitude: 0, timestamp: 0 });
  // const [isModalVisible, setModalVisible] = useState<boolean>(false);
  // const [keyword, setKeyword] = useState<string>('');
  // const [markers, setMarkers] = useState<Array<IMarker>>([]);
  // // prettier-ignore
  // const [editMarkers, setEditMarker] = useState<IMarker>({ latitude: 0, longitude: 0, radius: 0, color: "", unit: "km" });
  // const [distanceMode, setDistanceMode] = useState<boolean>(true);
  // const [lines, setLines] = useState<Array<ILine>>([]);
  // const [activeLine, setActiveLine] = useState<number>(0);
  // const [pinCount, setPinCount] = useState<number>(0);

  const [radius, setRadius] = useState(7);
  const [openHours, setOpenHours] = useState<{ [key: string]: string }>({});
  const [currentOpHour, setCurrentOpHour] = useState('');
  const [spots, setSpots] = useState<IPlace[]>([]);
  const [typesPopup, setTypesPopup] = useState(false);
  const [spotChecked, setSpotChecked] = useState<boolean[]>([]);

  const {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceDetail,
    getPlaceOpeningHours,
    places,
    setPlaces,
    API_KEY,
  } = googlePlace();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Flick');
    console.log('complete');
  }, []);

  useEffect(() => {
    searchNearbyPlace(location, radius * 100, 'bar');
  }, [location.latitude, location.longitude, radius]);

  // useEffect(() => {
  //   if (nextToken) {
  //     setTimeout(() => {
  //       getNextPlaces(nextToken);
  //     }, 500);
  //   }
  // }, [nextToken]);

  useEffect(() => {
    const checked: boolean[] = [];
    for (let i = 0; i < SPOT_TYPE.length; i += 1) {
      checked.push(false);
    }
    setSpotChecked(checked);
  }, [SPOT_TYPE]);

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
      : '';

  // add Spot to recommend list
  function onAddSpot(place: IPlace) {
    if (spots.indexOf(place) < 0) {
      setSpots((prev) => [...prev, place]);
      setPlaces((prev) => {
        const array = prev.slice(prev.indexOf(place));

        return array;
      });
    }
  }

  // get place detail on autocomplete
  async function onAutoComplete(details: any) {
    const detail = await getPlaceDetail(details.place_id);
    if (detail?.opening_hours) {
      setPlaces((prev) => [...prev, detail]);
      setLocation((prev) => {
        return {
          ...prev,
          latitude: detail.geometry.location.lat,
          longitude: detail.geometry.location.lng,
        };
      });
    }
  }

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
      renderRightButton={() => (
        <View
          style={{
            marginRight: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#dedede',
              height: 30,
              width: 2,
              marginRight: 10,
            }}
          />
          <Button
            onPress={() => {
              setTypesPopup(true);
            }}
            icon={() => (
              <Entypo name="dots-three-horizontal" size={24} color="#dedede" />
            )}
            buttonStyle={{
              backgroundColor: 'white',
            }}
          />
        </View>
      )}
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

  const renderMarker = (place: IPlace) => (
    <Marker
      description={place.name}
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      pinColor="orange"
      key={place.id}
      onSelect={() => onSpotPress(place)}
    >
      <Callout alphaHitTest>
        <View>
          <Text style={{ width: 200, flexWrap: 'wrap' }}>{place.name}</Text>
          <View
            style={{
              display: 'flex',
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
            <View style={{ marginLeft: 10 }}>
              <Text>営業時間</Text>
              <Text style={{ width: 100 }}>
                {openHours[place.place_id] ? openHours[place.place_id] : ''}
              </Text>
              <CalloutSubview
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
        onRegionChange={onRegionChange}
      >
        <MapCircle
          location={location}
          radius={radius * 100}
          color="#FFA50040"
        />
        {places?.map((place) => renderMarker(place))}
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
          </View>
          <View style={{ flex: 1 }}>
            <Slider
              value={radius}
              minimumValue={0}
              maximumValue={50}
              thumbStyle={{ width: 10, height: 10, backgroundColor: '#000' }}
              trackStyle={{ height: 1 }}
              onValueChange={onRadiusScroll}
              style={{ marginLeft: 20, marginRight: 20 }}
            />
          </View>
        </View>
        <View style={thisStyle.halfView}>
          <View style={thisStyle.buttonContainer}>
            <SmallCompleteButton
              title="スポットを保存"
              onPress={onCompleteButtonPress}
            />
          </View>
          <View style={thisStyle.buttonContainer}>
            <SmallCompleteButton
              title="スポットを保存"
              onPress={onCompleteButtonPress}
            />
          </View>
        </View>
      </View>
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
    height: 100,
    width: '100%',
  },
  halfView: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
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
    color: '#5d5d5d',
    fontSize: 16,
  },
  headerListView: {
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginTop: 2,
  },
});

export default SearchMapScreen;
