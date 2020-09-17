import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Right,
  Thumbnail,
  ListItem
} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from 'react-native-easy-grid';
// from app
import { COLOR, LAYOUT } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { CreatePlanFab } from 'app/src/components/Button';
import { appTextStyle } from 'app/src/styles';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { useGooglePlace } from 'app/src/hooks';
/** ホーム画面トップ */
const HomeScreen: React.FC = () => {
  /** デートプラン一覧取得 */
  const { navigate } = useNavigation();
  const onCompleteButtonPress = useCallback(() => {
    navigate('Road');
  }, []);
  const myPlan = useGlobalState('myPlan');
  const {
    API_KEY,
  } = useGooglePlace();
  const [heart, setHeart] = useState<boolean>(false);
  const [star, setStar] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [head_menu, setHead_menu] = useState<boolean>(false);
  let origin = {};

  const PlannerHeader = (
    <CardItem>
      <Left style={thisStyle.planner}>
        <Thumbnail source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} small />
        <Body style={thisStyle.body}>
          <Text
            style={(thisStyle.mainText, [{ fontSize: 18 }])}
          >
            {myPlan.plan.user_name}
          </Text>
          <Text note style={(thisStyle.mainText, [{ marginLeft: 10 }])}>
            {myPlan.plan.user_attr}.des
          </Text>
        </Body>
      </Left>
      <Right style={{ zIndex: 100 }}>
        <Entypo
          name="triangle-down"
          size={30}
          color={COLOR.tintColor}
        />
      </Right>
    </CardItem>
  );
  // plan like
  const PlannerLike = (
    <CardItem style={{ paddingTop: 20 }}>
      <Left />
      <Body />
      <Right>
        <Body style={thisStyle.bodylike}>
          <Button
            style={thisStyle.likebutton}
            transparent
            onPress={() => setHeart(!heart)}
          >
            {heart ? (
              <FontAwesome5 name="heart" size={24} color={COLOR.tintColor} />
            ) : (
                <FontAwesome5 name="heart" size={24} color={COLOR.greyColor} />
              )}
          </Button>
          <Button
            style={thisStyle.likebutton}
            transparent
            onPress={() => setStar(!star)}
          >
            {star ? (
              <Entypo name="star-outlined" size={24} color={COLOR.tintColor} />
            ) : (
                <Entypo name="star-outlined" size={24} color={COLOR.greyColor} />
              )}
          </Button>
          <Button
            style={thisStyle.likebutton}
            transparent
            onPress={() => setComment(!comment)}
          >
            {comment ? (
              <FontAwesome name="comment-o" size={24} color={COLOR.tintColor} />
            ) : (
                <FontAwesome name="comment-o" size={24} color={COLOR.greyColor} />
              )}
          </Button>
        </Body>
      </Right>
    </CardItem>
  );
  // plan footer
  const PlannerFooter = (
    <Grid>
      <Row>
        <Col>
          <ListItem thumbnail>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} small />
            </Left>
            <Body style={{ width: LAYOUT.window.width * 0.3 }}>
              <Text style={thisStyle.footerText}>{myPlan.plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {myPlan.plan.user_attr}.des
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </ListItem >
        </Col>
        <Col>
          <ListItem thumbnail>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} small />
            </Left>
            <Body style={{ width: LAYOUT.window.width * 0.3 }}>
              <Text style={thisStyle.footerText}>{myPlan.plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {myPlan.plan.user_attr}.des
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </ListItem >
        </Col>
      </Row>
      <Row>
        <Col>
          <ListItem thumbnail>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} small />
            </Left>
            <Body style={{ width: LAYOUT.window.width * 0.3 }}>
              <Text style={thisStyle.footerText}>{myPlan.plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {myPlan.plan.user_attr}.des
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </ListItem >
        </Col>
        <Col>
          <ListItem thumbnail>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }} small />
            </Left>
            <Body style={{ width: LAYOUT.window.width * 0.3 }}>
              <Text style={thisStyle.footerText}>{myPlan.plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {myPlan.plan.user_attr}.des
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </ListItem >
        </Col>
      </Row>
    </Grid>
  );
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
  const renderDirection = (place: any, index: any) => {
    if (index == 0) {
      origin = place;
    }
    else {
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
        >
        </MapViewDirections>
      )
    }
  }
  return (
    <View style={thisStyle.container}>
      <Card style={thisStyle.card}>
        {PlannerHeader}
        <CardItem cardBody>
          <Image source={{ uri: '' }} style={thisStyle.image} />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: myPlan.plan.spots[0].latitude,
              longitude: myPlan.plan.spots[0].longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05,
            }}
            style={thisStyle.map}
          >
            {myPlan.plan.spots.map((place: any, index: any) => renderDirection(place, index))}
            {myPlan.plan.spots.map((place: any) => renderMarker(place, 'orange'))}
          </MapView>
        </CardItem>
        <CardItem style={thisStyle.description}>
          <Left>
            <Text style={thisStyle.mainText}>{myPlan.plan.title}</Text>
          </Left>
          <Right>
            <ScrollView horizontal>
              <Text note style={thisStyle.descriptionText}>
                {myPlan.plan.spots.map((spot) => spot.spot_name).join(' > ')}
              </Text>
            </ScrollView>
          </Right>
        </CardItem>
        {PlannerLike}
        {PlannerFooter}
      </Card>
      <View style={{ alignItems: 'center', paddingTop: 5 }}>
        <Button style={thisStyle.footerButton}
          onPress={onCompleteButtonPress}
        >
          <Text style={{ fontSize: 16, color: COLOR.baseBackgroundColor }}>プランを使用する</Text>
        </Button>
      </View>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
  },
  card: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#ccc',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    height: LAYOUT.window.height * 0.8
  },
  planner: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: LAYOUT.window.height * 0.25,
  },
  map: {
    flex: 1,
    height: LAYOUT.window.height * 0.3,
  },
  description: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: COLOR.greyColor,
    borderBottomWidth: 1,
  },
  linkButtonGroup: {
    // backgroundColor: COLOR.baseBackgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 0,
    marginBottom: 10,
  },
  linkButton: {
    flex: 1,
    justifyContent: 'center',
  },
  mainText: {
    fontFamily: 'genju-medium',
    fontSize: 14,
  },
  footerText: {
    fontFamily: 'genju-medium',
    fontSize: 10,
    height: LAYOUT.window.height * 0.015
  },
  descriptionText: {
    fontFamily: 'genju-light',
    fontSize: 12,
  },
  linkButtonText: {
    color: COLOR.tintColor,
    fontSize: 15,
  },
  body: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bodylike: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  likebutton: {
    padding: 5,
  },
  footer: {
    paddingLeft: 0,
  },
  footerButton: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.4,
    borderRadius: 10,
    justifyContent: 'center'
  },
});

export default HomeScreen;
