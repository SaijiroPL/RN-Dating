import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Constants } from "expo";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { Container, Content, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { IUserInfo } from "app/src/interfaces/User";
import { IPlanFull } from "app/src/interfaces/api/Plan";
import { ICommentList } from "app/src/interfaces/api/Comment";
import { IApiError } from "app/src/interfaces/api/Error";
import Colors from "app/src/constants/Colors";
import { LoadingSpinner } from "app/src/components/Spinners";
import UserHeader from "app/src/components/contents/UserHeader";
import ImageCarousel from "app/src/components/contents/ImageCarousel";
import SimpleMapView from "app/src/components/map/SimpleMapView";
import CommentGrid from "app/src/components/contents/CommentGrid";
import LikeButton from "app/src/components/buttons/LikeButton";
import { handleError } from "app/src/utils/ApiUtil";
import { formatDate } from "app/src/utils/DateUtil";
import appStyle, { appTextStyle } from "app/src/styles/general-style";

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const PlanDetailScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const planId = useNavigationParam("id");

  const [plan, setPlan] = useState<IPlanFull>({
    plan_id: "",
    title: "",
    description: "",
    date: "",
    transportation: [],
    need_time: 0,
    create_date: "",
    spots: [],
    user_id: "",
    user_name: "",
    user_attr: "",
    user_image_url: "",
    like_count: 0,
    comment_count: 0,
    is_liked: false
  });
  const [comments, setComments] = useState<ICommentList>({
    total: 0,
    comment_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isPlanLoading, setIsPlanLoading] = useState<boolean>(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getPlanDetail(signal);
    setIsLiked(plan.is_liked);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getCommentList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  const onCommentPress = () => {
    navigate("comment", { id: plan.plan_id });
  };

  /** デートプラン詳細取得 */
  const getPlanDetail = (signal: CancelTokenSource) => {
    axios
      .get(Constants.manifest.extra.apiEndpoint + "/plans/" + planId, {
        cancelToken: signal.token
      })
      .then((response: { data: IPlanFull }) => {
        setPlan(Object.assign(response.data));
        setIsPlanLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          handleError(error);
          if (error.response.stats === 400) {
            setErrors(error.response.data);
          }
        }
        setIsPlanLoading(false);
      });
  };

  /** コメント一覧取得 */
  const getCommentList = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/plans/" + planId + "/comments";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: ICommentList }) => {
        setComments(Object.assign(response.data));
        setIsCommentsLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          handleError(error);
          if (error.response.stats === 400) {
            setErrors(error.response.data);
          }
        }
        setIsCommentsLoading(false);
      });
  };

  // TODO 自分のプランの場合描画しない
  /** デートプラン作成者部分を描画する */
  const renderPlannerHeader = () => {
    const planner: IUserInfo = {
      userId: plan.user_id,
      userName: plan.user_name,
      userAttr: plan.user_attr,
      userImageUrl: plan.user_image_url
    };

    return <UserHeader user={planner} />;
  };

  /** デートプラン説明部分を描画する */
  const renderPlanDescription = () => {
    return (
      <View style={thisStyle.planDescriptionContainer}>
        <View style={thisStyle.route}>
          <Text note style={thisStyle.descriptionText}>
            {plan.spots.map(spot => spot.spot_name).join(" > ")}
          </Text>
        </View>
        <View style={appStyle.row}>
          <View style={thisStyle.title}>
            <Text style={thisStyle.titleText}>{plan.title}</Text>
          </View>
          <LikeButton
            likeCount={plan.like_count}
            liked={isLiked}
            setLiked={setIsLiked}
          />
        </View>
        <View style={thisStyle.detail}>
          <View style={appStyle.row}>
            <View style={thisStyle.columnTitle}>
              <Text style={thisStyle.columnTitleText}>ポイント</Text>
            </View>
            <View style={thisStyle.description}>
              <Text style={thisStyle.descriptionText}>{plan.description}</Text>
            </View>
          </View>
          <View style={appStyle.row}>
            <View style={thisStyle.columnTitle}>
              <Text style={thisStyle.columnTitleText}>デート予定日</Text>
            </View>
            <View style={thisStyle.description}>
              <Text style={thisStyle.descriptionText}>
                {formatDate(plan.date)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isPlanLoading || isCommentsLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Content>
        {renderPlannerHeader()}
        <ImageCarousel plan={plan} />
        <SimpleMapView spot={plan.spots[0]} />
        {renderPlanDescription()}
        <CommentGrid comments={comments.comment_list} />
        {comments.total > 0 && (
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <Text onPress={onCommentPress} style={appTextStyle.detailLinkText}>
              >> 全{comments.total}件のコメントを見る
            </Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  planDescriptionContainer: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  route: {
    alignItems: "flex-end",
    backgroundColor: Colors.baseBackgroundColor,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  title: {
    marginLeft: 10
  },
  detail: {
    marginLeft: 10
  },
  titleText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  },
  columnTitle: {
    backgroundColor: Colors.tintColor,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 2,
    paddingHorizontal: 5
  },
  columnTitleText: {
    color: "white",
    fontFamily: "genju-medium",
    fontSize: 10
  },
  description: {
    marginTop: 2
  },
  descriptionText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
  }
});

export default PlanDetailScreen;
