/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Image, View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Slider } from 'react-native-elements';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';

import debounce from 'lodash/debounce';

// from app
import { ILocation } from 'app/src/interfaces/app/Map';
import { MapCircle } from 'app/src/components/MapItem';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { googlePlace, IPlace } from 'app/src/hooks';
import { COLOR } from 'app/src/constants';

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
  const [openHours, setOpenHours] = useState<string>('...');
  const [spots, updateSpots] = useState<IPlace[]>([]);

  const {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceOpeningHours,
    places,
  } = googlePlace();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Flick');
    console.log('complete');
  }, []);

  useEffect(() => {
    searchNearbyPlace(location, radius * 100, 'bar');
  }, [radius]);

  // useEffect(() => {
  //   if (nextToken) {
  //     setTimeout(() => {
  //       getNextPlaces(nextToken);
  //     }, 500);
  //   }
  // }, [nextToken]);

  const mapRef = useRef(null);

  // Radius Change event
  const handleRadiusScroll = debounce((value: number) => {
    setRadius(value);
  }, 100);

  function onRadiusScroll(value: number) {
    handleRadiusScroll(value);
  }
  // Spot Photo and Operation Hour
  async function onSpotPress(place: IPlace) {
    const detail = await getPlaceOpeningHours(place.place_id);
    setOpenHours(detail);
  }

  const getPhotoUrl = (place: IPlace) =>
    place.photos && place.photos.length > 0
      ? getPlacePhoto(place.photos[0].photo_reference)
      : '';

  // add Spot to recommend list
  function onAddSpot(place: IPlace) {
    console.log(spots.indexOf(place));
    if (spots.indexOf(place) < 0) updateSpots((prev) => [...prev, place]);
  }

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
      >
        <MapCircle
          location={location}
          radius={radius * 100}
          color="#FFA50040"
        />
        {places?.map((place) => (
          <Marker
            description={place.name}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            pinColor="orange"
            key={place.id}
            // image={{ uri: place.icon, width: 15, height: 15 }}
            onPress={() => onSpotPress(place)}
          >
            <Callout alphaHitTest>
              <View>
                <Text style={{ width: 200, flexWrap: 'wrap' }}>
                  {place.name}
                </Text>
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
                    <Text style={{ width: 100 }}>{openHours}</Text>
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
        ))}
      </MapView>
      {/* <SearchBar
        placeholder="Type Here..."
        style={{ position: 'absolute', top: 10 }}
      /> */}
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

      {/* TODO MapHeader */}
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
    height: 30,
    marginTop: 5,
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
});

export default SearchMapScreen;
