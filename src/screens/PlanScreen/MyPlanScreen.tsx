import React, { useCallback, useState } from 'react';
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
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// from app
import { COLOR, LAYOUT } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { PlanCardList } from 'app/src/components/List';
import { CreatePlanFab } from 'app/src/components/Button';
import { useGetPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';
import MapView from 'react-native-maps';
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
/** ホーム画面トップ */
const HomeScreen: React.FC = () => {
  /** デートプラン一覧取得 */
  const {
    isPlanListLoading,
    plans,
    isRefreshing,
    onRefresh,
  } = useGetPlanList();
  const { navigate } = useNavigation();
  const onCompleteButtonPress = useCallback(() => {
    navigate('Arrival');
  }, []);
  const [heart, setHeart] = useState<boolean>(false);
  const [star, setStar] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [head_menu, setHead_menu] = useState<boolean>(false);
  // temp plan data
  const temp_plans: any = {
    plan_id: '1',
    title: 'plan1',
    description: 'i am description1',
    create_date: '2020-08-24',
    spots: [
      {
        spot_name: 'spot1',
        latitude: 35.658606737323325,
        longitude: 139.69814462256613,
      },
    ],
    user_id: '1',
    user_name: '花子',
    user_attr: 'habako.des',
    user_avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    user_image_url:
      'https://i.pinimg.com/originals/5b/55/88/5b5588af841070a2284ea76e2042dd9d.jpg',
    like_count: 10,
    comment_count: 4,
  };
  const PlannerHeader = (
    <CardItem>
      <Left style={thisStyle.planner}>
        <Thumbnail source={{ uri: temp_plans.user_avatar }} small />
        <Body style={thisStyle.body}>
          <Text style={(thisStyle.mainText, [{ fontSize: 18 }])}>
            {temp_plans.user_name}
          </Text>
          <Text note style={(thisStyle.mainText, [{ marginLeft: 10 }])}>
            {temp_plans.user_attr}
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
        <Col>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: temp_plans.user_avatar }} small />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{temp_plans.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {temp_plans.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
        </Col>
        <Col>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: temp_plans.user_avatar }} small />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{temp_plans.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {temp_plans.user_attr}
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
        <Col>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: temp_plans.user_avatar }} small />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{temp_plans.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {temp_plans.user_attr}
              </Text>
            </Body>
            <Right>
              <Text note style={thisStyle.footerText}>
                11h
              </Text>
            </Right>
          </CardItem>
        </Col>
        <Col>
          <CardItem style={thisStyle.footer}>
            <Left style={thisStyle.planner}>
              <Thumbnail source={{ uri: temp_plans.user_avatar }} small />
            </Left>
            <Body>
              <Text style={thisStyle.footerText}>{temp_plans.user_name}</Text>
              <Text note style={thisStyle.footerText}>
                {temp_plans.user_attr}
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

  return (
    <View style={thisStyle.container}>
      <Card style={thisStyle.card}>
        {PlannerHeader}
        <CardItem cardBody>
          <Image
            source={{ uri: temp_plans.user_image_url }}
            style={thisStyle.image}
          />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: temp_plans.spots[0].latitude,
              longitude: temp_plans.spots[0].longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05,
            }}
            style={thisStyle.map}
          />
        </CardItem>
        <CardItem style={thisStyle.description}>
          <Left>
            <Text style={thisStyle.mainText}>{temp_plans.title}</Text>
          </Left>
          <Body />
          <Right>
            <Text note style={thisStyle.descriptionText}>
              {temp_plans.spots.map((spot) => spot.spot_name).join(' > ')}
            </Text>
          </Right>
        </CardItem>
        {PlannerLike}
        {PlannerFooter}
      </Card>
      <View style={{ alignItems: 'center', paddingTop: 5 }}>
        <Button style={thisStyle.footerButton} onPress={onCompleteButtonPress}>
          <Text style={{ fontSize: 16, color: COLOR.baseBackgroundColor }}>
            プランを使用する
          </Text>
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
    height: LAYOUT.window.height * 0.8,
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
    justifyContent: 'center',
  },
});

export default HomeScreen;
