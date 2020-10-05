import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Body,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Right,
  Thumbnail,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';

// from app
import { COLOR, IMAGE, LAYOUT } from 'app/src/constants';
import { IPlan } from 'app/src/interfaces/api/Plan';
import { ScrollView } from 'react-native-gesture-handler';
import { useGooglePlace } from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { ActionType } from 'app/src/Reducer';

interface Props {
  plan: IPlan;
  myPlan?: boolean;
}

/** デートプランカード */
export const PlanCard: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const { plan, myPlan } = props;
  const loginUser = useGlobalState('loginUser');

  const [heart, setHeart] = useState<boolean>(false);
  const [star, setStar] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [head_menu, setHead_menu] = useState<boolean>(false);

  const { API_KEY } = useGooglePlace();
  let origin = {};
  /** プラン押下時の処理 */
  const onPlanPress = useCallback(() => {
    navigate('Detail', { planId: plan.plan_id });
  }, [plan]);

  /** コメント数押下時の処理 */
  const onCommentPress = useCallback(() => {
    navigate('Comment', { planId: plan.plan_id });
  }, [plan]);

  /** お気に入り数押下時の処理 */
  const onLikePress = useCallback(() => {
    navigate('Like', { planId: plan.plan_id });
  }, [plan]);

  /** ユーザー押下時の処理 */
  const onUserPress = useCallback(() => {
    navigate('Profile', { userId: plan.user_id });
  }, [plan]);

  useEffect(() => {
    if (plan.user_id == loginUser.id) {
      dispatch({
        type: ActionType.SET_MY_PLAN,
        payload: {
          plan,
        },
      });
    }
    // async function getPhotos() {
    //   let detail = await getPlaceDetail(plan.plan_id);
    // }
    // getPhotos();
  }, []);
  /** プラン作成者ヘッダー */
  const PlannerHeader = (
    <CardItem>
      <Left style={thisStyle.planner}>
        <Thumbnail
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
          small
        />
        <Body style={thisStyle.body}>
          <Text
            style={(thisStyle.mainText, [{ fontSize: 18 }])}
            onPress={onUserPress}
          >
            {plan.user_name}
          </Text>
          <Text note style={(thisStyle.mainText, [{ marginLeft: 10 }])}>
            {plan.user_attr}
          </Text>
        </Body>
      </Left>
      <Right style={{ zIndex: 100 }}>
        <Entypo name="triangle-down" size={30} color={COLOR.tintColor} />
      </Right>
    </CardItem>
  );
  // plan like
  const PlannerLike = (
    <CardItem>
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
        <Col onPress={onCommentPress}>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail
                source={{
                  uri: 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                small
              />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {plan.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
        </Col>
        <Col onPress={onCommentPress}>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail
                source={{
                  uri: 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                small
              />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {plan.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
        </Col>
      </Row>
      <Row>
        <Col onPress={onCommentPress}>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail
                source={{
                  uri: 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                small
              />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {plan.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
        </Col>
        <Col onPress={onCommentPress}>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail
                source={{
                  uri: 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                small
              />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{plan.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {plan.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
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
    />
  );
  const renderDirection = (place: any, index: any) => {
    if (index == 0) {
      origin = place;
    } else {
      const temp_origin = origin;
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
        />
      );
    }
  };

  return (
    <TouchableOpacity onPress={onPlanPress}>
      <Card style={thisStyle.card}>
        {PlannerHeader}
        <CardItem cardBody>
          <Image
            source={{ uri: plan.user_image_url }}
            style={thisStyle.image}
          />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: plan.spots[0].latitude,
              longitude: plan.spots[0].longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05,
            }}
            style={thisStyle.map}
          >
            {plan.spots.map((place: any, index: any) =>
              renderDirection(place, index),
            )}
            {plan.spots.map((place: any) => renderMarker(place, 'orange'))}
          </MapView>
        </CardItem>
        <CardItem style={thisStyle.description}>
          <Left>
            <Text style={thisStyle.mainText}>{plan.title}</Text>
          </Left>
          <Right>
            <ScrollView horizontal>
              <Text note style={thisStyle.descriptionText}>
                {plan.spots.map((spot) => spot.spot_name).join(' > ')}
              </Text>
            </ScrollView>
          </Right>
        </CardItem>
        {myPlan && PlannerLike}
        {myPlan && PlannerFooter}
      </Card>
    </TouchableOpacity>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
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
  },
  planner: {
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: 180,
  },
  map: {
    flex: 1,
    height: 200,
  },
  description: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: COLOR.greyColor,
    borderBottomWidth: 1,
    // height: LAYOUT.window.height * 0.03
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
});

export default PlanCard;
