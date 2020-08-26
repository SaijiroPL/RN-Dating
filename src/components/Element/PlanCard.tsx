import React, { useCallback, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
import MapView from 'react-native-maps';
import {
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Entypo,
} from '@expo/vector-icons';

// from app
import { COLOR, IMAGE } from 'app/src/constants';
import { IPlan } from 'app/src/interfaces/api/Plan';

interface Props {
  plan: IPlan;
  myPlan?: boolean;
}

/** デートプランカード */
export const PlanCard: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { plan, myPlan } = props;

  const [heart, setHeart] = useState<boolean>(false);
  const [star, setStar] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);
  const [head_menu, setHead_menu] = useState<boolean>(false);

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

  /** プラン作成者ヘッダー */
  const PlannerHeader = (
    <CardItem>
      <Left style={thisStyle.planner}>
        <Thumbnail source={{ uri: plan.user_avatar }} small />
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
        <Entypo
          name="triangle-down"
          size={30}
          color={COLOR.tintColor}
          onPress={() => {
            setHead_menu(!head_menu);
          }}
        />
        {head_menu ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR.greyColor,
              padding: 10,
              position: 'absolute',
              top: 30,
              display: 'block',
            }}
          >
            <Text>Mute</Text>
            <Text>Report</Text>
            <Text>Link</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR.greyColor,
              padding: 10,
              position: 'absolute',
              top: 30,
              display: 'none',
            }}
          >
            <Text>Mute</Text>
            <Text>Report</Text>
            <Text>Link</Text>
          </View>
        )}
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
              <Thumbnail source={{ uri: plan.user_avatar }} small />
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
              <Thumbnail source={{ uri: plan.user_avatar }} small />
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
              <Thumbnail source={{ uri: plan.user_avatar }} small />
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
              <Thumbnail source={{ uri: plan.user_avatar }} small />
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

  return (
    <Card style={thisStyle.card}>
      {!myPlan && PlannerHeader}
      <CardItem cardBody>
        <Image source={{ uri: plan.user_image_url }} style={thisStyle.image} />
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
        />
      </CardItem>
      <CardItem style={thisStyle.description}>
        <Left>
          <Text style={thisStyle.mainText}>{plan.title}</Text>
        </Left>
        <Body />
        <Right>
          <Text note style={thisStyle.descriptionText}>
            {plan.spots.map((spot) => spot.spot_name).join(' > ')}
          </Text>
        </Right>
      </CardItem>
      {/* <CardItem style={thisStyle.linkButtonGroup}>
          <Button
            transparent
            style={thisStyle.linkButton}
            onPress={onLikePress}
          >
            <SimpleLineIcons name="like" size={15} color={COLOR.tintColor} />
            <Text style={thisStyle.linkButtonText}>{plan.like_count}</Text>
          </Button>
          <Button
            transparent
            style={thisStyle.linkButton}
            onPress={onCommentPress}
          >
            <FontAwesome name="comment-o" size={15} color={COLOR.tintColor} />
            <Text style={thisStyle.linkButtonText}>{plan.comment_count}</Text>
          </Button>
        </CardItem> */}
      {!myPlan && PlannerLike}
      {!myPlan && PlannerFooter}
    </Card>
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
