import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// from app
import { useGlobalState } from "app/src/Store";
import { COLOR } from "app/src/constants";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import { PlanCardList } from "app/src/components/List";
import { useGetLikePlanList } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * マイプラン画面
 * @author kotatanaka
 */
const MyPlanScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** 自分のお気に入りデートプラン一覧取得 */
  const {
    isLoading,
    plans,
    errors,
    isRefreshing,
    onRefresh
  } = useGetLikePlanList(loginUser.id);

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      <Text style={appTextStyle.countText}>
        お気に入りプラン数: {plans.total}
      </Text>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} />
      </ScrollView>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: "center"
  }
});

export default MyPlanScreen;
