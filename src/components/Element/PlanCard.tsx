import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Body,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Thumbnail,
} from 'native-base';
import MapView from 'react-native-maps';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

// from app
import { COLOR, IMAGE } from 'app/src/constants';
import { IPlan } from 'app/src/interfaces/api/Plan';

interface Props {
  plan: IPlan;
  myPlan?: boolean;
}

/**
 * デートプランコンポーネント
 * @author kotatanaka
 */
export const PlanCard: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { plan, myPlan } = props;

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
        <Thumbnail source={IMAGE.noUserImage} small />
        <Body>
          <Text style={thisStyle.mainText} onPress={onUserPress}>
            {plan.user_name}
          </Text>
          <Text note style={thisStyle.mainText}>
            {plan.user_attr}
          </Text>
        </Body>
      </Left>
    </CardItem>
  );

  return (
    <Card style={thisStyle.card}>
      <TouchableOpacity onPress={onPlanPress}>
        {!myPlan && PlannerHeader}
        <CardItem cardBody>
          <Image source={IMAGE.noImage} style={thisStyle.image} />
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
          <Text style={thisStyle.mainText}>{plan.title}</Text>
          <Text note style={thisStyle.descriptionText}>
            {plan.spots.map((spot) => spot.spot_name).join(' > ')}
          </Text>
        </CardItem>
        <CardItem style={thisStyle.linkButtonGroup}>
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
        </CardItem>
      </TouchableOpacity>
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
    height: 150,
  },
  map: {
    flex: 1,
    height: 150,
  },
  description: {
    alignItems: 'flex-start',
    flexDirection: 'column',
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
  descriptionText: {
    fontFamily: 'genju-light',
    fontSize: 12,
  },
  linkButtonText: {
    color: COLOR.tintColor,
    fontSize: 15,
  },
});

export default PlanCard;
