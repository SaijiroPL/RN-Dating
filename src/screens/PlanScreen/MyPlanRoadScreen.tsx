import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Left,
  Body,
  Text,
  Right,
  ListItem,
  Switch,
  DeckSwiper,
  Card,
} from 'native-base';
import { Button } from 'react-native-elements';
// from app
import { useGlobalState } from 'app/src/Store';
import { LAYOUT, COLOR } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { PlanCardList } from 'app/src/components/List';
import { useGetLikePlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useGooglePlace } from 'app/src/hooks';
import TermsScreen from '../TopScreen/TermsScreen';
import moment from 'moment';
import axios from 'axios';
import { or } from 'react-native-reanimated';
import { GOOGLE_MAP_ENDPOINT } from 'app/src/constants/Url';
/** マイプラン画面 */
const MyPlanRoadScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');
  const myPlan = useGlobalState('myPlan');

  const [origin, setOrigin] = useState({
    latitude: 35.658942,
    longitude: 139.697566,
    spot_name: 'Dougen-Zaka',
    current: 'current',
  });
  const [destination, setDestination] = useState(myPlan.plan.spots[0]);
  const [myRoad, setMyRoad] = useState([]);
  const [time, setTime] = useState(null);
  const [distance, setDistance] = useState(null);
  let place1 = {};

  const { API_KEY } = useGooglePlace();

  useEffect(() => {
    load_data();
  }, []);

  function load_data() {
    let arr = [];
    arr.push(origin);
    for (let i = 0; i < myPlan.plan.spots.length; i++) {
      myPlan.plan.spots[i].current = 'after';
      arr.push(myPlan.plan.spots[i]);
    }
    setMyRoad(arr);
    getDuration();
  }
  async function getDuration() {
    var url = GOOGLE_MAP_ENDPOINT.DISTANCE.replace('$1', origin.latitude)
      .replace('$2', origin.longitude)
      .replace('$3', destination.latitude)
      .replace('$4', destination.longitude)
      .replace('$5', 'driving');
    let response = await axios.get(url);
    let time = response.data.rows[0].elements[0].duration.text.split(' ')[0];
    let distance = response.data.rows[0].elements[0].distance.value;
    setTime(time);
    setDistance(distance);
  }
  const nextRoad = async () => {
    let arr = [];
    for (let i = 0; i < myRoad.length; i++) {
      if (myRoad[i].current == 'current') {
        if (i == myRoad.length - 2) {
          navigate('Arrival');
        } else {
          myRoad[i].current = 'before';
          arr.push(myRoad[i]);
          myRoad[i + 1].current = 'current';
          arr.push(myRoad[i + 1]);
          await setOrigin(myRoad[i + 1]);
          await setDestination(myRoad[i + 2]);
          i++;
        }
      } else {
        arr.push(myRoad[i]);
      }
    }
    console.log(arr, 'hello');
    setMyRoad(arr);
    getDuration();
  };
  // const onCompleteButtonPress = () => {
  //   navigate('Follow');
  // };
  const renderMarker = (place: any, index: any) => {
    if (place.current == 'current') {
      return (
        <Marker
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude,
          }}
          pinColor={'green'}
          key={index}
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
          key={index}
        ></Marker>
      );
    }
  };
  const renderDirection = (place: any, index: any) => {
    if (index == 0) {
      place1 = place;
    } else {
      let temp_origin = place1;
      place1 = place;
      if (temp_origin.current == 'before') {
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
            strokeColor="#ddd"
          ></MapViewDirections>
        );
      } else {
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
          ></MapViewDirections>
        );
      }
    }
  };
  return (
    <View style={thisStyle.container}>
      <View
        style={{
          height: LAYOUT.window.height * 0.7,
          borderColor: COLOR.textTintColor,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <MapView
          region={{
            latitude: myRoad.length ? myRoad[0].latitude : null,
            longitude: myRoad.length ? myRoad[0].longitude : null,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.7 }}
        >
          {myRoad.length
            ? myRoad.map((place: any, index: any) =>
                renderDirection(place, index),
              )
            : null}
          {myRoad.length
            ? myRoad.map((place: any, index: any) => renderMarker(place, index))
            : null}
        </MapView>
        <Card style={thisStyle.footerIcon1}>
          <Ionicons name="ios-send" size={40} color={COLOR.greyColor} />
        </Card>
      </View>
      <View style={thisStyle.button1}>
        <Button title={origin.spot_name} buttonStyle={thisStyle.button} />
        <View style={thisStyle.arrowH}>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVbkaeXBBNOql9vZkRpEznnzyfswHuq9xRjQ&usqp=CAU',
            }}
            style={thisStyle.arrowHImg}
          />
        </View>
        <Button buttonStyle={thisStyle.button} title={destination.spot_name} />
      </View>
      <View style={thisStyle.emptySpace}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: LAYOUT.window.width * 0.3,
          }}
        >
          <Text style={thisStyle.itemTitleText}>次の地点まであと</Text>
          <Text style={thisStyle.itemTitleText}>
            {distance}m {time}分
          </Text>
        </View>
        <View
          style={{
            width: LAYOUT.window.width * 0.5,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <FontAwesome5 name="arrow-up" size={20} color={COLOR.textTintColor} />
          <Text style={thisStyle.text2}>北へ淮む</Text>
        </View>
        <Button
          onPress={nextRoad}
          buttonStyle={[thisStyle.button, { width: LAYOUT.window.width * 0.1 }]}
          title="力フ"
        />
      </View>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 20,
  },
  button: {
    width: LAYOUT.window.width * 0.5,
    height: LAYOUT.window.height * 0.05,
    borderRadius: 10,
    margin: 20,
  },
  footerIcon1: {
    backgroundColor: 'white',
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    padding: 10,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: LAYOUT.window.height * 0.6,
    left: LAYOUT.window.width * 0.8,
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
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    padding: 15,
  },
  text2: {
    color: COLOR.textTintColor,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.3,
    borderRadius: 10,
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
  emptySpace: {
    marginBottom: 5,
    flexDirection: 'row',
    padding: 5,
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 12,
    marginRight: 10,
  },
});

export default MyPlanRoadScreen;
