import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { Container, Content, Text } from "native-base";

// from app
import { useGlobalState } from "app/src/Store";
import { COLOR } from "app/src/constants";
import { IUserInfo } from "app/src/interfaces/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { ImageCarousel, UserHeader } from "app/src/components/Content";
import { CommentGrid } from "app/src/components/List";
import { SimpleMapView } from "app/src/components/MapItem";
import { LikeButton } from "app/src/components/Button";
import { useGetPlanDetail, useGetCommentList } from "app/src/hooks";
import { formatDate } from "app/src/utils";
import { appStyle, appTextStyle } from "app/src/styles";

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
const PlanDetailScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** ナビゲーター */
  const { navigate } = useNavigation();

  /** デートプランID */
  const planId = useNavigationParam("id");

  /** デートプラン詳細取得 */
  const { isPlanLoading, plan, isLiked, setIsLiked } = useGetPlanDetail(
    planId,
    loginUser.id
  );

  /** コメント一覧取得 */
  const { isCommentsLoading, comments } = useGetCommentList(planId);

  /** コメントもっと見る押下時の処理 */
  const onMoreCommentPress = () => {
    navigate("comment", { id: plan.plan_id });
  };

  /** デートプラン作成者部分の描画 */
  const renderPlannerHeader = () => {
    const planner: IUserInfo = {
      userId: plan.user_id,
      userName: plan.user_name,
      userAttr: plan.user_attr,
      userImageUrl: plan.user_image_url
    };

    return <UserHeader user={planner} />;
  };

  /** デートプラン説明部分の描画 */
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

  // ローディング
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
            <Text
              onPress={onMoreCommentPress}
              style={appTextStyle.detailLinkText}
            >
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
