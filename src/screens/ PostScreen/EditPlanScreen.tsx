import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Switch,
  Right,
  Form
} from "native-base";

// from app
import { useGlobalState } from "app/src/Store";
import { COLOR } from "app/src/constants";
import { LoadingSpinner } from "app/src/components/Spinners";
import { ImageCarousel, UserHeader } from "app/src/components/Content";
import { SimpleMapView } from "app/src/components/MapItem";
import { CompleteButton } from "app/src/components/Button";
import { useGetPlanDetail } from "app/src/hooks";
import { formatDate } from "app/src/utils";
import { InputLabelTextAreaForm } from "app/src/components/Form";
import { appStyle, appTextStyle } from "app/src/styles";

/**
 * 投稿編集画面
 * @author itsukiyamada
 */
const EditPlanScreen: React.FC = () => {
  /**投稿データは仮置き */

  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** ナビゲーター */
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate("appTop");
  }, []);

  /** デートプランID */
  const planId = useNavigationParam("id");

  /** デートプラン詳細取得 */
  const { isPlanLoading, plan, getPlanDetail } = useGetPlanDetail(
    planId,
    loginUser.id
  );

  // ローディング
  if (isPlanLoading) {
    return LoadingSpinner;
  }

  /** デートプラン作成者部分の描画 */
  const PlannerHeader: JSX.Element = (
    <UserHeader
      user={{
        userId: plan.user_id,
        userName: plan.user_name,
        userAttr: plan.user_attr,
        userImageUrl: plan.user_image_url,
        isFollow: plan.is_follow
      }}
      reload={getPlanDetail}
    />
  );

  /** デートプラン説明部分 */
  const PlanDescription: JSX.Element = (
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
      </View>
      <View style={thisStyle.detail}>
        <View style={appStyle.row}>
          <View style={thisStyle.columnTitle}>
            <Text style={thisStyle.columnTitleText}>デート日時</Text>
          </View>
          <View style={thisStyle.description}>
            <Text style={thisStyle.descriptionText}>
              {formatDate(plan.date, "YYYY年MM月DD日")}
            </Text>
          </View>
          <View style={appStyle.row}>
            <View style={thisStyle.columnTitle}>
              <Text style={thisStyle.columnTitleText}>ポイント</Text>
            </View>
            <View style={thisStyle.description}>
              <Text style={thisStyle.descriptionText}>{plan.description}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      <Content>
        <ImageCarousel plan={plan} />
        <SimpleMapView spot={plan.spots[0]} />
        {PlanDescription}
        <Form>
          <InputLabelTextAreaForm
            label="ポイント"
            value={point}
            setValue={setPoint}
            errors={pointErrors}
          />
        </Form>
        <Right>
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
          <Text>投稿を非公開にする</Text>
          <Switch onValueChange={handleSwitchPrivateValue} value={privateOn} />
        </Right>
        <CompleteButton title="投稿" onPress={onCompleteButtonPress} />
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
  descriptionText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
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
  myPlanHeader: {
    alignItems: "center",
    backgroundColor: COLOR.baseBackgroundColor
  }
});

export default EditPlanScreen;
