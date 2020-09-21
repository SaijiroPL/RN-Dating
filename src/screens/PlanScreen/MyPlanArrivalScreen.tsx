import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Image, View, ToastAndroid } from 'react-native';
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

const API_KEY = 'AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI';
/** マイプラン画面 */
const MyPlanArrivalScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');
  const myPlan = useGlobalState('myPlan');

  let place1 = {};

  /** 自分のお気に入りデートプラン一覧取得 */

  const onCompleteButtonPress = () => {
    navigate('Home');
  };

  useEffect(() => {
    ToastAndroid.showWithGravityAndOffset(
      '目的地に到着しました。',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  }, []);

  const renderMarker = (place: any, color: string) => (
    <Marker
      coordinate={{
        latitude: place.latitude,
        longitude: place.longitude,
      }}
      pinColor={color}
      key={place.id}
    ></Marker>
  );
  const renderDirection = (place: any, index: any) => {
    if (index == 0) {
      place1 = place;
    } else {
      let temp = place1;
      place1 = place;
      return (
        <MapViewDirections
          origin={{
            latitude: temp.latitude,
            longitude: temp.longitude,
          }}
          destination={{
            latitude: place.latitude,
            longitude: place.longitude,
          }}
          apikey={`${API_KEY}`}
          strokeWidth={3}
          strokeColor="orange"
          mode="DRIVING"
        />
      );
    }
  };

  return (
    <View style={thisStyle.container}>
      <View
        style={{
          height: LAYOUT.window.height * 0.28,
          marginLeft: LAYOUT.window.width * 0.03,
        }}
      >
        <DeckSwiper
          dataSource={myPlan.plan.spots}
          renderItem={(item: any) => (
            <Image
              style={{
                height: LAYOUT.window.height * 0.26,
                width: LAYOUT.window.width * 0.9,
              }}
              source={{ uri: item.imageUrl }}
            />
          )}
        />
      </View>
      <View
        style={{
          height: LAYOUT.window.height * 0.3,
          borderColor: COLOR.textTintColor,
          borderWidth: 1,
          borderRadius: 5,
        }}
      >
        <MapView
          region={{
            latitude: myPlan.plan.spots[0].latitude,
            longitude: myPlan.plan.spots[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.05,
          }}
          style={{ height: LAYOUT.window.height * 0.27 }}
        >
          {myPlan.plan.spots.map((place: any, index: any) =>
            renderDirection(place, index),
          )}
          {myPlan.plan.spots.map((place: any) => renderMarker(place, 'orange'))}
        </MapView>
        <Text
          note
          style={{
            textAlign: 'right',
            padding: 3,
            paddingRight: 10,
            borderColor: COLOR.textTintColor,
            borderTopWidth: 1,
            borderRadius: 3,
            height: LAYOUT.window.height * 0.03,
          }}
        >
          {myPlan.plan.spots.map((spot) => spot.spot_name).join(' > ')}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          height: LAYOUT.window.height * 0.25,
          justifyContent: 'center',
        }}
      >
        <Button
          buttonStyle={[thisStyle.button, { backgroundColor: COLOR.tintColor }]}
          title="次のスポットへ"
          onPress={onCompleteButtonPress}
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
    padding: 10,
    paddingTop: 20,
  },
  button: {
    width: LAYOUT.window.width * 0.5,
    height: LAYOUT.window.height * 0.05,
    borderRadius: 10,
    margin: 20,
  },
});

export default MyPlanArrivalScreen;
