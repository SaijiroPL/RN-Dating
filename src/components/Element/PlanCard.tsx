import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import TimeAgo from 'react-native-timeago';
import { useActionSheet } from '@expo/react-native-action-sheet';
// from app
import { COLOR, LAYOUT } from 'app/src/constants';
import { IPlan, ISpot } from 'app/src/interfaces/api/Plan';
import { ScrollView } from 'react-native-gesture-handler';
import {
  useGooglePlace,
  useLikePlan,
  useGetPlanDetail,
  useGetCommentList,
} from 'app/src/hooks';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { ActionType } from 'app/src/Reducer';
import { CompleteButton } from '../Button';

interface Props {
  plan: IPlan;
  liked?: boolean;
}
const moment = require('moment');
require('moment/locale/ja');

moment.locale('ja');
/** デートプランカード */
export const PlanCard: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const { plan, liked } = props;
  const loginUser = useGlobalState('loginUser');
  const planDetail = useGetPlanDetail(plan.plan_id, loginUser.id);
  const { isCommentsLoading, comments } = useGetCommentList(plan.plan_id);

  const [selectedSpot, setSelectedSpot] = useState(0);

  const [heart, setHeart] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);

  const { API_KEY } = useGooglePlace();
  const { likePlan, unlikePlan } = useLikePlan(loginUser.id);

  let origin: ISpot = { spot_name: '', latitude: 0, longitude: 0 };

  // /** プラン押下時の処理 */
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
    planDetail.getPlanDetail();
  }, []);

  const onLike = async () => {
    if (!heart) {
      const res = await likePlan(plan.plan_id);
      if (res) setHeart(true);
    } else {
      const res = await unlikePlan(plan.plan_id);
      if (res) setHeart(false);
    }
  };

  const onGuide = () => {
    dispatch({
      type: ActionType.SET_MY_PLAN,
      payload: plan,
    });
    navigate('Road');
  };

  const optionsMyPlan = [
    '削除',
    '編集',
    'リンクをコピー',
    '別アプリでシェア',
    'キャンセル',
  ];

  const optionsOtherPlan = [
    '通報',
    'リンクをコピー',
    '別アプリでシェア',
    '非表示',
    'キャンセル',
  ];

  const optionsFavPlan = [
    '通報',
    'リンクをコピー',
    '別アプリでシェア',
    'お気に入り解除',
    'キャンセル',
  ];

  function showPlanMenu() {
    let options = optionsOtherPlan;
    let destructiveButtonIndex = -1;
    if (plan.user_id === loginUser.id) {
      destructiveButtonIndex = 0;
      options = optionsMyPlan;
    } else if (planDetail.plan.is_liked) {
      options = optionsFavPlan;
    }
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex: 4,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
      },
    );
  }

  const formatMinute = (time: number) =>
    `${Math.floor(time / 60)}時間${time % 60}分`;

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
          <View>
            <Text
              note
              style={{
                color: 'black',
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'bold',
              }}
            >
              所要時間
            </Text>
            <Text
              note
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'left',
                fontWeight: 'bold',
              }}
            >
              {formatMinute(plan.needtime)}
            </Text>
          </View>
        </Body>
      </Left>
      <Right style={{ zIndex: 100 }}>
        <Text onPress={() => showPlanMenu()}>
          <FontAwesome5 name="caret-down" size={36} color={COLOR.tintColor} />
        </Text>
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
          <Button style={thisStyle.likebutton} transparent>
            {heart ? (
              <FontAwesome5 name="heart" size={24} color={COLOR.tintColor} />
            ) : (
              <FontAwesome5 name="heart" size={24} color={COLOR.greyColor} />
            )}
          </Button>
          <Button style={thisStyle.likebutton} transparent onPress={onLike}>
            {planDetail.plan.is_liked ? (
              <FontAwesome5
                name="star"
                size={24}
                color={COLOR.tintColor}
                solid
              />
            ) : (
              <FontAwesome5 name="star" size={24} color={COLOR.greyColor} />
            )}
          </Button>
          <Button
            style={thisStyle.likebutton}
            transparent
            onPress={() => setComment(!comment)}
          >
            {comment ? (
              <FontAwesome5 name="comment" size={24} color={COLOR.tintColor} />
            ) : (
              <FontAwesome5 name="comment" size={24} color={COLOR.greyColor} />
            )}
          </Button>
        </Body>
      </Right>
    </CardItem>
  );
  // plan footer
  // const commentRows = useMemo(() => {
  //   const elements = [];

  //   return elements;
  // });

  const commentRows = useMemo(() => {
    const elements = [];

    for (let i = 0; i < comments.total / 2; i += 2) {
      elements.push(
        <Row>
          <Col onPress={onCommentPress}>
            <CardItem style={thisStyle.footer}>
              <View style={thisStyle.planner}>
                <Thumbnail
                  source={{
                    uri: 'https://www.w3schools.com/howto/img_avatar.png',
                  }}
                  small
                />
              </View>
              <View
                style={{
                  ...thisStyle.planner,
                  width: LAYOUT.window.width * 0.2,
                }}
              >
                <Text style={thisStyle.footerText}>
                  {comments.comment_list[i].user_name}
                </Text>
                <Text note style={thisStyle.footerText}>
                  {comments.comment_list[i].comment.length > 15
                    ? `${comments.comment_list[i].comment.substr(0, 12)}...`
                    : comments.comment_list[i].comment}
                </Text>
              </View>
              <View style={thisStyle.planner}>
                <Text note style={thisStyle.footerText}>
                  <TimeAgo
                    time={comments.comment_list[i].create_date}
                    hideAgo
                  />
                </Text>
              </View>
            </CardItem>
          </Col>
          {i < comments.total - 1 ? (
            <Col onPress={onCommentPress}>
              <CardItem style={thisStyle.footer}>
                <View style={thisStyle.planner}>
                  <Thumbnail
                    source={{
                      uri: 'https://www.w3schools.com/howto/img_avatar.png',
                    }}
                    small
                  />
                </View>
                <View
                  style={{
                    ...thisStyle.planner,
                    width: LAYOUT.window.width * 0.2,
                  }}
                >
                  <Text style={thisStyle.footerText}>
                    {comments.comment_list[i + 1].user_name}
                  </Text>
                  <Text note style={thisStyle.footerText}>
                    {comments.comment_list[i + 1].comment.length > 15
                      ? `${comments.comment_list[i + 1].comment.substr(
                          0,
                          12,
                        )}...`
                      : comments.comment_list[i + 1].comment}
                  </Text>
                </View>
                <View style={thisStyle.planner}>
                  <Text note style={thisStyle.footerText}>
                    <TimeAgo
                      time={comments.comment_list[i + 1].create_date}
                      hideAgo
                    />
                  </Text>
                </View>
              </CardItem>
            </Col>
          ) : (
            <Col />
          )}
        </Row>,
      );
    }

    return elements;
  }, [comments]);
  const PlannerFooter = <Grid>{commentRows}</Grid>;
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
  const renderDirection = (place: ISpot, index: number) => {
    if (index === 0) {
      origin = place;

      return null;
    }
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
        strokeColor={index <= selectedSpot ? 'orange' : 'grey'}
      />
    );
  };

  return (
    <Card style={thisStyle.card}>
      {PlannerHeader}
      <CardItem cardBody>
        <Image source={{ uri: plan.user_image_url }} style={thisStyle.image} />
      </CardItem>
      <CardItem cardBody>
        <MapView
          region={{
            latitude: plan.spots[selectedSpot].latitude,
            longitude: plan.spots[selectedSpot].longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={thisStyle.map}
        >
          {plan.spots.map((place, index) => renderDirection(place, index))}
          {plan.spots.map((place, index) =>
            renderMarker(place, index <= selectedSpot ? 'orange' : 'grey'),
          )}
        </MapView>
      </CardItem>
      <CardItem style={thisStyle.description}>
        <View style={{ flex: 1 }}>
          <Text style={thisStyle.mainText}>{plan.title}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <ScrollView horizontal>
            {plan.spots.map((spot, index) => (
              <View style={thisStyle.spotContainer}>
                <Text
                  style={{
                    ...thisStyle.buttonTitleStyle,
                    color: index === selectedSpot ? 'orange' : 'black',
                  }}
                  onPress={() => setSelectedSpot(index)}
                >
                  {spot.spot_name}
                </Text>
                {index < plan.spots.length - 1 && (
                  <Text style={thisStyle.arrowText}>→</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </CardItem>
      {PlannerLike}
      {PlannerFooter}
      {liked && (
        <View
          style={{
            alignItems: 'center',
            padding: 15,
          }}
        >
          <CompleteButton title="プランを使用する" onPress={onGuide} />
        </View>
      )}
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
    marginLeft: 10,
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
  buttonTitleStyle: {
    maxWidth: LAYOUT.window.width * 0.3,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowText: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  spotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

PlanCard.defaultProps = {
  liked: false,
};

export default PlanCard;
