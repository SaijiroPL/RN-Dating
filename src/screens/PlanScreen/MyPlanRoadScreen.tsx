import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
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
  Card
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
// import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
const API_KEY = 'AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI';
/** マイプラン画面 */
const MyPlanRoadScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [direction, setDirection] = useState([]);

  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** 自分のお気に入りデートプラン一覧取得 */
  const { isLoading, plans, isRefreshing, onRefresh } = useGetLikePlanList(
    loginUser.id,
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  // const onCompleteButtonPress = () => {
  //   navigate('Follow');
  // };
  const temp_plans = [
    {
      address: "渋谷区道玄坂１丁目１４−９ ソシアルビル 2F",
      heart: false,
      id: "ChIJIZhoRlaLGGARoHtonsnP9A4",
      imageUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CkQ0AAAABWA5MkM5PoM_NyLYq84qWgJK1PEEc9jW4dAkvT-UwYYzuEn2xUgW7k5n5VEsJ2zd_sb3ik09fD8F4B_7AOVPpxIQ2qMcKUs2-lLKT-MXIeK4LBoUuzEWL3lnCTfwKK1s7dcjwLWIN5E&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI",
      latitude: 35.657303,
      like: false,
      longitude: 139.698032,
      openinghour: "15:00-23:30",
      rating: 160,
      spotName: "EMMA LOUNGE",
    },
    {
      address: "渋谷区道玄坂２丁目２９−１３ 若槻ビル 1F",
      heart: false,
      id: "ChIJWf63wKmMGGARdEnmc-AVkgc",
      imageUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CkQ0AAAAwucYngNJ3qQoSDQ49Oex6ZigD3VwANkdV-23mWP-4pvt5rx6talddK_gfuR9d7gl1wMEverbHNoH_7oo6TMwIBIQP927aqJKSu6YavjXVP9VZRoUDIEYXTDh9SHkAh2-noD6MJJZLIA&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI",
      latitude: 35.6596632,
      like: false,
      longitude: 139.6978583,
      openinghour: "12:00-15:00",
      rating: 408,
      spotName: "焼肉バル韓の台所 本店",
    },
    {
      address: "渋谷区渋谷区宇田川町31−３ 1F 第3田中ビル",
      heart: false,
      id: "ChIJYZ6mD6mMGGAR6K18r4VD7bk",
      imageUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CkQ0AAAAL07KcH6XLol2ReCOJn96wgOPVYrhOBT2iuPgbD2rjtVzA04SpwCo_vk1KHjg7R9cxHOfCH3j3xxFOOcJh8rynBIQjahcmYrM-GKDw1S4rH6JZBoU2dQMDi-DV9nBHHp0yT-hIKeqq7E&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI",
      latitude: 35.6613642,
      like: false,
      longitude: 139.6978978,
      openinghour: "11:30-23:15",
      rating: 158,
      spotName: "キリンシティ渋谷ウエスト",
    },
    {
      address: "渋谷区道玄坂２丁目２９−８ 道玄坂センタービル 5F",
      heart: false,
      id: "ChIJT2m_xKmMGGARd2G7PXWzChY",
      imageUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CkQ0AAAA7daf8VvZB_hdU3sZ7_Jim31506iFsIqXfpVsPjMcgdeY5DM9z7Feu6boTs6ogrtWg5N8HKRYpawPJqa1oAqIbxIQVUznNpHo-OxJkus44HznZxoUe41bTFlXFklGEPE3N633XcT8rwU&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI",
      latitude: 35.659315,
      like: false,
      longitude: 139.697966,
      openinghour: "16:00-00:00",
      rating: 106,
      spotName: "ミライザカ 渋谷道玄坂店",
    },
    {
      address: "渋谷区３３ 宇田川町３３−１０ J+Rビル 2F",
      heart: false,
      id: "ChIJp2D1S6iMGGARhHUehUNRjaU",
      imageUrl: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CkQ0AAAA8lwmYMHm5Tq5M6JxB-xAtempBffp2WgHZh_3d_dhG8fQbVc7ZJIln66CvOA6JxS2mXsoAOei7mYtaK2G5ZTkCRIQ0Frv05HHFy3fMc-bMHBuABoUJxTrSf4NE-fE5qPf6flTzvdxxXI&key=AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI",
      latitude: 35.66100000000001,
      like: false,
      longitude: 139.696676,
      openinghour: "17:00-22:30",
      rating: 56,
      spotName: "Bistro Brown 渋谷店",
    },
  ];
  // useEffect(() => {
  //   if (temp_plans) {
  //     if (temp_plans.length) {
  //       console.log(temp_plans);
  //       let arr = [];
  //       for (let i = 0; i < temp_plans.length - 1; i++) {
  //         let obj = {
  //           origin: {
  //             latitude: temp_plans[i].latitude,
  //             longitude: temp_plans[i].longitude,
  //           },
  //           destination: {
  //             latitude: temp_plans[i + 1].latitude,
  //             longitude: temp_plans[i + 1].longitude,
  //           },
  //         }
  //         arr.push(obj);
  //       }
  //       console.log(arr);
  //       setDirection(arr);
  //     }
  //   }
  // }, [])
  const renderMarker = (place: any, color: string) => (
    <Marker
      coordinate={{
        latitude: place.latitude,
        longitude: place.longitude,
      }}
      pinColor={color}
      key={place.id}
    >
    </Marker >
  );
  const renderDirection = (place: any) => (
    <MapViewDirections
      origin={{
        latitude: place.origin.latitude,
        longitude: place.origin.longitude,
      }}
      destination={{
        latitude: place.destination.latitude,
        longitude: place.destination.longitude,
      }}
      apikey={`${API_KEY}`}
      strokeWidth={3}
      strokeColor="orange"
      mode="DRIVING"
    />
  )
  return (
    <View style={thisStyle.container}>
      <View style={{ height: LAYOUT.window.height * 0.7, borderColor: COLOR.textTintColor, borderWidth: 1, borderRadius: 5 }}>
        <MapView
          region={{
            latitude: temp_plans[0].latitude,
            longitude: temp_plans[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.7 }}
        >

          {direction.length ? direction.map((place: any) => renderDirection(place)) : null}
          {temp_plans.map((place: any) => renderMarker(place, 'orange'))}
        </MapView>
        <Card style={thisStyle.footerIcon1}>
          <Ionicons name="ios-send" size={40} color={COLOR.greyColor} />
        </Card>
      </View>
      <View style={thisStyle.button1}>
        <Button title="異人館" buttonStyle={thisStyle.button} />
        <View style={thisStyle.arrowH} >
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRVbkaeXBBNOql9vZkRpEznnzyfswHuq9xRjQ&usqp=CAU' }} style={thisStyle.arrowHImg} />
        </View>
        <Button buttonStyle={thisStyle.button} title="力フェシルバ" />
      </View>
      <View style={thisStyle.emptySpace}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: LAYOUT.window.width * 0.3 }}>
          <Text style={thisStyle.itemTitleText}>次の地点まであと</Text>
          <Text style={thisStyle.itemTitleText}>350m 5分</Text>
        </View>
        <View style={{ width: LAYOUT.window.width * 0.5, padding: 10, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
          <FontAwesome5 name="arrow-up" size={20} color={COLOR.textTintColor} />
          <Text style={thisStyle.text2}>北へ淮む</Text>
        </View>
        <Button buttonStyle={[thisStyle.button, { width: LAYOUT.window.width * 0.1 }]} title="力フ" />
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
    paddingTop: 20
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
    left: LAYOUT.window.width * 0.8
  },
  arrowH: {
    flexDirection: 'column',
    width: LAYOUT.window.width * 0.3,
    alignItems: 'center'
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
    borderRadius: 10
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
    borderRadius: 10,
    padding: 5,
    height: LAYOUT.window.height * 0.03,
    width: LAYOUT.window.width * 0.25,
    alignItems: 'center'
  },
  columnTitleText: {
    color: 'white',
    fontFamily: 'genju-medium',
    fontSize: 12,
  },
  emptySpace: {
    marginBottom: 5,
    flexDirection: 'row',
    padding: 5
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 12,
    marginRight: 10,
  },
});

export default MyPlanRoadScreen;
