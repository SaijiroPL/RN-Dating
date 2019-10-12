import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { Container, Content, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT, COLOR } from "app/src/constants";
import { IUserInfo } from "app/src/interfaces/User";
import { IPlanFull } from "app/src/interfaces/api/Plan";
import { ICommentList } from "app/src/interfaces/api/Comment";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import { ImageCarousel, UserHeader } from "app/src/components/Content";
import { CommentGrid } from "app/src/components/List";
import { SimpleMapView } from "app/src/components/MapItem";
import { LikeButton } from "app/src/components/Button";
import { formatDate, handleError } from "app/src/utils";
import { appStyle, appTextStyle } from "app/src/styles";

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const PlanDetailScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");
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
    const url = API_ENDPOINT.PLAN.replace("$1", planId);
    axios
      .get(url, {
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
    const url = API_ENDPOINT.PLAN_COMMENTS.replace("$1", planId);

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
                {formatDate(plan.date, "YYYY年MM月DD日")}
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
        {loginUser.id !== plan.user_id ? (
          renderPlannerHeader()
        ) : (
          <View style={thisStyle.myPlanHeader}>
            <Text style={appTextStyle.standardText}>マイプラン</Text>
          </View>
        )}
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
    backgroundColor: COLOR.baseBackgroundColor,
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
    textDecorationColor: COLOR.tintColor,
    textDecorationLine: "underline"
  },
  columnTitle: {
    backgroundColor: COLOR.tintColor,
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
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
  },
  myPlanHeader: {
    alignItems: "center",
    backgroundColor: COLOR.baseBackgroundColor
  }
});

export default PlanDetailScreen;
