import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// from app
import { useGlobalState } from "app/src/Store";
import { COLOR } from "app/src/constants";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import { PlanCardList } from "app/src/components/List";
import { useGetPlanList } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * マイプラン画面
 * @author kotatanaka
 */
const MyPlanScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** デートプラン一覧取得(マイプランのみ) */
  const { isLoading, plans, errors, isRefreshing, onRefresh } = useGetPlanList(
    loginUser.id
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      <Text style={appTextStyle.countText}>
        作成したデートプランの数: {plans.total}
      </Text>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} myPlan />
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
