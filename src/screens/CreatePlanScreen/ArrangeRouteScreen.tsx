import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
  Left,
  Body,
  Right,
  ListItem,
  Switch,
  DeckSwiper,
} from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
// from app
import { getToday } from 'app/src/utils';
import { formatDate, toDate } from 'app/src/utils/DateUtil';
import { SmallCompleteButton } from 'app/src/components/Button/SmallCompleteButton';
import { LAYOUT, COLOR } from 'app/src/constants';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useGlobalState } from 'app/src/Store';

import { ICandidateSpot } from 'app/src/interfaces/app/Spot';
import { getDistance, getPreciseDistance } from 'geolib';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useGooglePlace } from 'app/src/hooks';
import moment from 'moment';
import axios from 'axios';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { ActionType } from 'app/src/Reducer';
import { EKI_ENDPOINT } from 'app/src/constants/Url';
import { GOOGLE_MAP_ENDPOINT } from 'app/src/constants/Url';
import { API_ENDPOINT } from 'app/src/constants/Url';
/** デートスポット順番並べ替え画面 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const { API_KEY } = useGooglePlace();
  const createRealSpots = useGlobalState('createRealSpots');
  const createPlan = useGlobalState('createPlan');
  const loginUser = useGlobalState('loginUser');

  // const [date, setDate] = useState<string>('');
  const [spotRoad, setSpotRoad] = useState([]);
  const [spotTrasitRoad, setSpotTrasitRoad] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [toDate, updateTo] = useState<string>('');
  const [spotFromDate, setSpotFromDate] = useState(null);
  const [spotToDate, setSpotToDate] = useState(null);
  const [directionMode, setDirectionMode] = useState(null);
  const [durationMode, setDurationMode] = useState(null);
  const [state, setState] = useState(true);
  let origin = null,
    pol_origin = null;

  const onGotoHome = () => {
    var config = save();
    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          navigate('Home');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onCompleteButtonPress = useCallback(() => {
    var config = save();
    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          navigate('Home');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // 仮データ

  useEffect(() => {
    getAllData();
  }, []);

  function save() {
    let spots = [];
    for (let i = 0; i < spotRoad.length; i++) {
      let obj = {
        spot_name: spotRoad[i].spotName,
        latitude: spotRoad[i].latitude,
        longitude: spotRoad[i].longitude,
        order: i + 1,
        need_time: 60,
      };
      spots.push(obj);
    }
    let data = {
      user_id: loginUser.id,
      title: title,
      description: description,
      date: createPlan.fromDate.split(' ')[0],
      need_time: duration,
      transportation: createPlan.trasportations,
      spots: spots,
    };
    var config = {
      method: 'post',
      url: API_ENDPOINT.PLAN_GET,
      data: data,
    };
    return config;
  }

  async function getSpotRoad(start, array) {
    let spotArray = [];
    spotArray.push(start);
    array = array.filter((item) => item.id !== start.id);
    let arr = [],
      arr1 = [];
    for (let i = 0; i < array.length; i++) {
      let dis = getDistance(
        { latitude: start.latitude, longitude: start.longitude },
        { latitude: array[i].latitude, longitude: array[i].longitude },
      );
      arr.push(dis);
      if (i == array.length - 1) {
        arr1 = arr.sort(function (a, b) {
          return a - b;
        });
        array[arr.indexOf(arr1[0])]['select'] = false;
        spotArray.push(array[arr.indexOf(arr1[0])]);
        let id = array[arr.indexOf(arr1[0])].id;
        start = array[arr.indexOf(arr1[0])];
        array = array.filter((item) => item.id !== id);
        i = -1;
        arr = [];
      }
    }
    await setSpotRoad(spotArray);
    return spotArray;
  }

  async function getSpotTransitRoad(array, type) {
    let totalArray = [];
    if (array.length == 1) {
      totalArray = array;
    } else {
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (i == j - 1) {
            let dis = getDistance(
              { latitude: array[i].latitude, longitude: array[i].longitude },
              { latitude: array[j].latitude, longitude: array[j].longitude },
            );
            if (dis < 2000) {
              array[i].transitmode = 'walking';
              array[j].transitmode = 'transit';
              totalArray.push(array[i]);
              if (i == array.length - 2) {
                array[j].transitmode = 'walking';
                totalArray.push(array[j]);
              }
            } else {
              array[i].transitmode = 'walking';
              totalArray.push(array[i]);
              let nearbyplace = await getNearbyPlace(array[i], type);
              nearbyplace.transitmode = 'transit';
              totalArray.push(nearbyplace);
              let nearbyplace1 = await getNearbyPlace(array[j], type);
              nearbyplace1.transitmode = 'transit';
              totalArray.push(nearbyplace1);
              if (i == array.length - 2) {
                array[j].transitmode = 'walking';
                totalArray.push(array[j]);
              }
            }
          }
        }
      }
    }
    await setSpotTrasitRoad(totalArray);
    return totalArray;
  }

  async function getAllData() {
    await setSpotFromDate(createPlan.fromDate.split(' ')[1]);
    if (createPlan.trasportations[0] == 'car') {
      await setDirectionMode('DRIVING');
      await setDurationMode('driving');
      let arr = await getSpotRoad(
        createRealSpots.total[0],
        createRealSpots.total,
      );
      getDuration(arr, 'driving');
    } else if (createPlan.trasportations[0] == 'walk') {
      await setDirectionMode('WALKING');
      await setDurationMode('walking');
      let arr = await getSpotRoad(
        createRealSpots.total[0],
        createRealSpots.total,
      );
      getDuration(arr, 'walking');
    } else if (createPlan.trasportations[0] == 'bus') {
      await setDirectionMode('WALKING');
      await setDurationMode('bus');
      let arr = await getSpotRoad(
        createRealSpots.total[0],
        createRealSpots.total,
      );
      let nearby = await getSpotTransitRoad(arr, 'bus');
      getTransitDuration(nearby);
    } else {
      await setDirectionMode('WALKING');
      await setDurationMode('train');
      let arr = await getSpotRoad(
        createRealSpots.total[0],
        createRealSpots.total,
      );
      let nearby = await getSpotTransitRoad(arr, 'train');
      getTransitDuration(nearby);
    }
  }

  async function getNearbyPlace(data, type) {
    var url = EKI_ENDPOINT.NEARBYPLACE.replace('$1', data.latitude)
      .replace('$2', data.longitude)
      .replace('$3', type);
    let response = await axios.get(url);
    if (Array.isArray(response.data.ResultSet.Point)) {
      return response.data.ResultSet.Point[0];
    } else {
      return response.data.ResultSet.Point;
    }
  }
  async function getDuration(array, durationState) {
    let spotDuration = 0;
    if (array.length > 1) {
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (i + 1 == j) {
            var url = GOOGLE_MAP_ENDPOINT.DISTANCE.replace(
              '$1',
              array[i].latitude,
            )
              .replace('$2', array[i].longitude)
              .replace('$3', array[j].latitude)
              .replace('$4', array[j].longitude)
              .replace('$5', durationState);
            let response = await axios.get(url);
            spotDuration += response.data.rows[0].elements[0].duration.value;
            if (i == array.length - 2) {
              await setDuration(spotDuration);
              var d = moment
                .duration(createPlan.fromDate.split(' ')[1])
                .add(
                  moment.duration(
                    moment
                      .utc(spotDuration * 1000 + array.length * 3600000)
                      .format('HH:mm'),
                  ),
                );
              var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
              await setSpotToDate(dd);
            }
          }
        }
      }
    } else if (array.length == 1) {
      var d = moment
        .duration(createPlan.fromDate.split(' ')[1])
        .add(moment.duration(moment.utc(3600000).format('HH:mm')));
      var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
      await setSpotToDate(dd);
    }
  }
  async function getTransitDuration(array) {
    let spotDuration = 0;
    if (array.length > 1) {
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (i + 1 == j) {
            if (
              array[i].transitmode == 'transit' &&
              array[j].transitmode == 'transit'
            ) {
              var url = EKI_ENDPOINT.COURSE.replace(
                '$1',
                array[i].GeoPoint.lati_d,
              )
                .replace('$2', array[i].GeoPoint.longi_d)
                .replace('$3', array[j].GeoPoint.lati_d)
                .replace('$4', array[j].GeoPoint.longi_d);
              let response = await axios.get(url);
              let temp_arr = [];
              for (var k = 0; k < response.data.ResultSet.Course.length; k++) {
                temp_arr.push(
                  parseInt(response.data.ResultSet.Course[k].Route.timeOnBoard),
                );
              }
              temp_arr = temp_arr.sort(function (a, b) {
                return a - b;
              });
              spotDuration += temp_arr[0] * 60;
            } else {
              let lat, lot, lat1, lot1;
              if (array[i].transitmode == 'walking') {
                lat = array[i].latitude;
                lot = array[i].longitude;
              } else if (array[i].transitmode == 'transit') {
                lat = array[i].GeoPoint.lati_d;
                lot = array[i].GeoPoint.longi_d;
              }
              if (array[j].transitmode == 'walking') {
                lat1 = array[j].latitude;
                lot1 = array[j].longitude;
              } else if (array[j].transitmode == 'transit') {
                lat1 = array[j].GeoPoint.lati_d;
                lot1 = array[j].GeoPoint.longi_d;
              }

              var url = GOOGLE_MAP_ENDPOINT.DISTANCE.replace('$1', lat)
                .replace('$2', lot)
                .replace('$3', lat1)
                .replace('$4', lot1)
                .replace('$5', 'walking');
              let response = await axios.get(url);
              spotDuration += response.data.rows[0].elements[0].duration.value;
            }
            if (i == array.length - 2) {
              await setDuration(spotDuration);
              let realpalce = 0;
              for (let k = 0; k < array.length; k++) {
                if (array[k].transitmode == 'walking') {
                  realpalce++;
                }
              }
              var d = moment
                .duration(createPlan.fromDate.split(' ')[1])
                .add(
                  moment.duration(
                    moment
                      .utc(spotDuration * 1000 + realpalce * 3600000)
                      .format('HH:mm'),
                  ),
                );
              var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
              await setSpotToDate(dd);
              let state = await getState();
              await setState(state);
            }
          }
        }
      }
    } else if (array.length == 1) {
      var d = moment
        .duration(createPlan.fromDate.split(' ')[1])
        .add(moment.duration(moment.utc(3600000).format('HH:mm')));
      var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
      await setSpotToDate(dd);
    }
  }
  async function getState() {
    let cur = eval(
      moment
        .utc(
          moment(createPlan.toDate, 'YYYY-MM-DD HH:mm').diff(
            moment(createPlan.fromDate, 'YYYY-MM-DD HH:mm'),
          ),
        )
        .format('HH') *
        60 +
        eval(
          moment
            .utc(
              moment(createPlan.toDate, 'YYYY-MM-DD HH:mm').diff(
                moment(createPlan.fromDate, 'YYYY-MM-DD HH:mm'),
              ),
            )
            .format('mm') * 1,
        ),
    );
    let stay = eval(
      moment
        .utc(moment(spotToDate, 'HH:mm').diff(moment(spotFromDate, 'HH:mm')))
        .format('HH') *
        60 +
        eval(
          moment
            .utc(
              moment(spotToDate, 'HH:mm').diff(moment(spotFromDate, 'HH:mm')),
            )
            .format('mm') * 1,
        ),
    );
    return cur > stay;
  }
  const onSpotPress = async (place: any, index: any) => {
    if (spotRoad.filter((item) => item.select == true).length) {
      let arr = [...spotRoad];
      arr[index] = arr.filter((item) => item.select == true)[0];
      arr[selectedIndex] = place;
      arr.filter((item) => item.select == true)[0].select = false;
      await setSpotRoad(arr);
      if (durationMode == 'bus' || durationMode == 'train') {
        let nearby = await getSpotTransitRoad(arr, durationMode);
        getTransitDuration(nearby);
      } else {
        getDuration(arr, durationMode);
      }
    } else {
      let arr = [...spotRoad];
      arr.filter((item) => item.id == place.id)[0].select = true;
      await setSelectedIndex(index);
      await setSpotRoad(arr);
    }
  };
  const renderMarker = (place: any) => {
    if (place.transitmode == 'transit') {
      if (place == undefined) {
        return false;
      }
      let lat = parseFloat(place.GeoPoint.lati_d);
      let lot = parseFloat(place.GeoPoint.longi_d);
      return (
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lot,
          }}
          pinColor={'green'}
          key={place.Station.code}
        ></Marker>
      );
    } else {
      return (
        <Marker
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude,
          }}
          pinColor={'orange'}
          key={place.id}
        ></Marker>
      );
    }
  };
  const renderDirection = (place: any, index: any) => {
    if (durationMode == 'bus' || durationMode == 'train') {
      if (place.transitmode == 'walking') {
        if (!origin) {
          origin = place;
          if (pol_origin) {
            let lat = parseFloat(pol_origin.GeoPoint.lati_d);
            let lot = parseFloat(pol_origin.GeoPoint.longi_d);
            let lat1 = place.latitude;
            let lot1 = place.longitude;
            pol_origin = null;
            return (
              <MapViewDirections
                origin={{
                  latitude: lat,
                  longitude: lot,
                }}
                destination={{
                  latitude: lat1,
                  longitude: lot1,
                }}
                apikey={`${API_KEY}`}
                strokeWidth={5}
                strokeColor="orange"
                mode={directionMode}
              ></MapViewDirections>
            );
          }
        } else {
          let temp_origin = origin;
          origin = place;
          return (
            <MapViewDirections
              origin={{
                latitude: temp_origin.latitude,
                longitude: temp_origin.longitude,
              }}
              destination={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              apikey={`${API_KEY}`}
              strokeWidth={5}
              strokeColor="orange"
              mode={directionMode}
            ></MapViewDirections>
          );
        }
      } else {
        if (!pol_origin) {
          pol_origin = place;
          if (origin) {
            let lat = origin.latitude;
            let lot = origin.longitude;
            let lat1 = parseFloat(place.GeoPoint.lati_d);
            let lot1 = parseFloat(place.GeoPoint.longi_d);
            origin = null;
            return (
              <MapViewDirections
                origin={{
                  latitude: lat,
                  longitude: lot,
                }}
                destination={{
                  latitude: lat1,
                  longitude: lot1,
                }}
                apikey={`${API_KEY}`}
                strokeWidth={5}
                strokeColor="orange"
                mode={directionMode}
              ></MapViewDirections>
            );
          }
        } else {
          let lat = parseFloat(pol_origin.GeoPoint.lati_d);
          let lot = parseFloat(pol_origin.GeoPoint.longi_d);
          let lat1 = parseFloat(place.GeoPoint.lati_d);
          let lot1 = parseFloat(place.GeoPoint.longi_d);
          pol_origin = place;
          return (
            <Polyline
              strokeWidth={5}
              strokeColor="green"
              coordinates={[
                { latitude: lat, longitude: lot },
                { latitude: lat1, longitude: lot1 },
              ]}
            ></Polyline>
          );
        }
      }
    } else {
      if (index == 0) {
        origin = place;
      } else {
        let temp_origin = origin;
        origin = place;
        return (
          <MapViewDirections
            origin={{
              latitude: temp_origin.latitude,
              longitude: temp_origin.longitude,
            }}
            destination={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            apikey={`${API_KEY}`}
            strokeWidth={5}
            strokeColor="orange"
            mode={directionMode}
          ></MapViewDirections>
        );
      }
    }
  };
  const renderRoadName = (place: any, index: any) => (
    <View style={{ padding: 5, flexDirection: 'row' }}>
      {(() => {
        if (place.select) {
          return (
            <Text
              onPress={() => onSpotPress(place, index)}
              style={{
                backgroundColor: COLOR.tintColor,
                padding: 3,
                borderRadius: 5,
              }}
            >
              {place.spotName}
            </Text>
          );
        } else {
          return (
            <Text onPress={() => onSpotPress(place, index)}>
              {place.spotName}
            </Text>
          );
        }
      })()}
      {(() => {
        if (index != spotRoad.length - 1) {
          return <AntDesign name="arrowright" size={24} color="black" />;
        }
      })()}
    </View>
  );
  return (
    <Container style={{ padding: 10 }}>
      <View
        style={{
          height: LAYOUT.window.height * 0.22,
          marginLeft: LAYOUT.window.width * 0.03,
        }}
      >
        <DeckSwiper
          dataSource={createRealSpots.total}
          renderItem={(item: any) => (
            <Image
              style={{
                height: LAYOUT.window.height * 0.2,
                width: LAYOUT.window.width * 0.9,
              }}
              source={{ uri: item.imageUrl }}
            />
          )}
        />
      </View>
      <View
        style={{
          height: LAYOUT.window.height * 0.25,
          borderColor: COLOR.textTintColor,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <MapView
          initialRegion={{
            latitude: spotRoad.length ? spotRoad[0].latitude : null,
            longitude: spotRoad.length ? spotRoad[0].longitude : null,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.25 }}
        >
          {durationMode == 'bus' || durationMode == 'train'
            ? spotTrasitRoad.map((place: any, index: any) =>
                renderDirection(place, index),
              )
            : spotRoad.map((place: any, index: any) =>
                renderDirection(place, index),
              )}
          {durationMode == 'bus' || durationMode == 'train'
            ? spotTrasitRoad.map((place: any) => renderMarker(place))
            : spotRoad.map((place: any) => renderMarker(place))}
        </MapView>
      </View>
      <ScrollView
        horizontal
        style={{
          padding: 5,
          borderColor: COLOR.greyColor,
          borderBottomWidth: 1,
        }}
      >
        {spotRoad.map((place: any, index: any) => renderRoadName(place, index))}
      </ScrollView>
      <View style={[thisStyle.emptySpace, { marginTop: 10 }]}>
        <View style={thisStyle.columnTitle}>
          <Text style={thisStyle.columnTitleText}>当日予定時刻</Text>
        </View>
        <View
          style={{
            width: LAYOUT.window.width * 0.7,
            padding: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={thisStyle.text2}>
            {spotFromDate} ~ {spotToDate}
          </Text>
          <Text style={thisStyle.text2}>
            {moment
              .utc(
                moment(spotToDate, 'HH:mm').diff(moment(spotFromDate, 'HH:mm')),
              )
              .format('HH')}
            時あ
            {moment
              .utc(
                moment(spotToDate, 'HH:mm').diff(moment(spotFromDate, 'HH:mm')),
              )
              .format('mm')}
            分
          </Text>
        </View>
      </View>
      <View style={thisStyle.emptySpace}>
        <View style={thisStyle.columnTitle}>
          <Text style={thisStyle.columnTitleText}>スポット滞在時間</Text>
        </View>
        <View
          style={{
            width: LAYOUT.window.width * 0.7,
            padding: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={thisStyle.text2}>
            {createPlan.fromDate.split(' ')[0]}
          </Text>
          <Text style={thisStyle.text2}>
            {createPlan.fromDate.split(' ')[1]} ~{' '}
            {createPlan.toDate.split(' ')[1]}
          </Text>
          <Text style={thisStyle.text2}>
            {moment
              .utc(
                moment(createPlan.toDate, 'YYYY-MM-DD HH:mm').diff(
                  moment(createPlan.fromDate, 'YYYY-MM-DD HH:mm'),
                ),
              )
              .format('HH')}
            時あ
            {moment
              .utc(
                moment(createPlan.toDate, 'YYYY-MM-DD HH:mm').diff(
                  moment(createPlan.fromDate, 'YYYY-MM-DD HH:mm'),
                ),
              )
              .format('mm')}
            分
          </Text>
        </View>
      </View>
      <Form>
        <Item>
          <Input
            placeholder="プラン名変更"
            style={thisStyle.text2}
            onChangeText={(e) => setTitle(e)}
          />
        </Item>
        <Item style={{ marginTop: 25 }}>
          <Input
            placeholder="ポイントを書く"
            style={thisStyle.text2}
            onChangeText={(e) => setDescription(e)}
          />
        </Item>
      </Form>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text style={thisStyle.itemTitleText}>投稿時日時を非公開にする</Text>
          <Switch onValueChange={() => setSwitch1(!switch1)} value={switch1} />
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text style={thisStyle.itemTitleText}>投稿を非公開にする</Text>
          <Switch onValueChange={() => setSwitch2(!switch2)} value={switch2} />
        </View>
      </View>
      <View style={thisStyle.button1}>
        <View style={{ marginLeft: 10 }} />
        {state ? (
          <>
            <Button
              title="保存"
              buttonStyle={thisStyle.footerButton}
              onPress={onGotoHome}
            />
            <Button
              buttonStyle={thisStyle.footerButton}
              title="保存して案内"
              onPress={onCompleteButtonPress}
            />
          </>
        ) : (
          <>
            <Button
              title="保存"
              buttonStyle={thisStyle.footerButton}
              disabled
              onPress={onGotoHome}
            />
            <Button
              buttonStyle={thisStyle.footerButton}
              disabled
              title="保存して案内"
              onPress={onCompleteButtonPress}
            />
          </>
        )}
      </View>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
    borderRadius: 10,
    padding: 5,
    height: LAYOUT.window.height * 0.03,
    width: LAYOUT.window.width * 0.25,
    alignItems: 'center',
  },
  columnTitleText: {
    color: 'white',
    fontFamily: 'genju-medium',
    fontSize: 12,
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 11,
    marginRight: 10,
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    padding: 15,
  },
  text: {
    color: COLOR.textTintColor,
    fontSize: 10,
    padding: 20,
  },
  text2: {
    color: COLOR.textTintColor,
    fontSize: 14,
    padding: 5,
  },
  emptySpace: {
    height: LAYOUT.window.height * 0.04,
    flexDirection: 'row',
    padding: 5,
  },
  button: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.3,
    borderRadius: 10,
  },
  footerButton: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.4,
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
  },
  arrowH: {
    flexDirection: 'column',
    width: LAYOUT.window.width * 0.3,
    alignItems: 'center',
  },
  arrowHImg: {
    height: 20,
    width: '90%',
  },
});

export default ArrangeRouteScreen;
