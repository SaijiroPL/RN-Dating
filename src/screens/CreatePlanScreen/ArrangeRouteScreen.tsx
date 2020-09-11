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
import MapView, { Marker } from 'react-native-maps';
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
/** デートスポット順番並べ替え画面 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const { API_KEY } = useGooglePlace();
  const createRealSpots = useGlobalState('createRealSpots');
  const createPlan = useGlobalState('createPlan');
  const loginUser = useGlobalState('loginUser');

  // const [date, setDate] = useState<string>('');
  const [spotRoad, setSpotRoad] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [toDate, updateTo] = useState<string>('');
  const [spotFromDate, setSpotFromDate] = useState(null);
  const [spotToDate, setSpotToDate] = useState(null);
  let origin = {};

  const onGotoHome = () => {
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
      url: 'https://one-date-dev.herokuapp.com/plans?',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

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
    navigate('Plan');
  }, []);
  // 仮データ
  useEffect(() => {
    setSpotFromDate(createPlan.fromDate.split(' ')[1]);
    let spotArray = [];
    spotArray.push(createRealSpots.total[0]);
    function getSpotRoad(start, array) {
      array = array.filter((item) => item.id !== createRealSpots.total[0].id);
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
    }
    getSpotRoad(createRealSpots.total[0], createRealSpots.total);
    setSpotRoad(spotArray);
    getDuration(spotArray);
  }, []);
  function getDuration(array) {
    let spotDuration = 0;
    if(array.length > 1){
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (i + 1 == j) {
            var config = {
              method: 'get',
              url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${array[i].latitude},${array[i].longitude}&destinations=${array[j].latitude},${array[j].longitude}&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI&mode=driving`,
            };
            axios(config)
              .then(function (response) {
                spotDuration += response.data.rows[0].elements[0].duration.value;
                setDuration(spotDuration);
                var d = moment
                  .duration(createPlan.fromDate.split(' ')[1])
                  .add(
                    moment.duration(
                      moment
                        .utc(spotDuration * 1000 + (array.length) * 3600000)
                        .format('HH:mm'),
                    ),
                  );
                var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
                setSpotToDate(dd);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      }
    }
    else if(array.length == 1){
      var d = moment
      .duration(createPlan.fromDate.split(' ')[1])
      .add(
        moment.duration(
          moment
            .utc(3600000)
            .format('HH:mm'),
        ),
      );
    var dd = moment.utc(d.as('milliseconds')).format('HH:mm');
    setSpotToDate(dd);
    }
  }
  function getState() {
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
  const onSpotPress = (place: any, index: any) => {
    if (spotRoad.filter((item) => item.select == true).length) {
      let arr = [...spotRoad];
      arr[index] = arr.filter((item) => item.select == true)[0];
      arr[selectedIndex] = place;
      arr.filter((item) => item.select == true)[0].select = false;
      setSpotRoad(arr);
      getDuration(arr);
    } else {
      let arr = [...spotRoad];
      arr.filter((item) => item.id == place.id)[0].select = true;
      setSelectedIndex(index);
      setSpotRoad(arr);
    }
  };
  const renderMarker = (place: ICandidateSpot, color: string) => (
    <Marker
      coordinate={{
        latitude: place.latitude,
        longitude: place.longitude,
      }}
      pinColor={color}
      key={place.id}
    >
    </Marker>
  );
  const renderDirection = (place: any, index: any) => {
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
          strokeWidth={3}
          strokeColor="orange"
          mode="DRIVING"
        ></MapViewDirections>
      );
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
          region={{
            latitude: spotRoad.length ? spotRoad[0].latitude : null,
            longitude: spotRoad.length ? spotRoad[0].longitude : null,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.25 }}
        >
          {spotRoad.map((place: any, index: any) =>
            renderDirection(place, index),
          )}
          {spotRoad.map((place: any) => renderMarker(place, 'orange'))}
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
        {getState() ? (
          <Button
            title="保存"
            buttonStyle={thisStyle.footerButton}
            onPress={onGotoHome}
          />
        ) : (
          <Button
            title="保存"
            buttonStyle={thisStyle.footerButton}
            disabled
            onPress={onGotoHome}
          />
        )}
        <View style={{ width: 20, marginRight: 10 }} />
        {getState() ? (
          <Button
            buttonStyle={thisStyle.footerButton}
            title="保存して案内"
            onPress={onCompleteButtonPress}
          />
        ) : (
          <Button
            buttonStyle={thisStyle.footerButton}
            disabled
            title="保存して案内"
            onPress={onCompleteButtonPress}
          />
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
