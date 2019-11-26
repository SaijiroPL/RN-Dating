import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import { UserProfile } from "app/src/components/Content";
import { SettingFab } from "app/src/components/Button";
import { useGetUserDetail, useGetPlanList } from "app/src/hooks";
import { appStyle } from "app/src/styles";
import { PlanCardList } from "app/src/components/List";
import { LAYOUT } from "app/src/constants";

/**
 * プロフィール(ユーザー詳細)画面トップ
 * @author kotatanaka
 */
const ProfileScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** ユーザー詳細取得 */
  const { isUserLoading, user } = useGetUserDetail(userId, loginUser.id);

  /** デートプラン取得 */
  const { isPlanListLoading, plans, isRefreshing, onRefresh } = useGetPlanList(
    userId
  );

  // ローディング
  if (isUserLoading || isPlanListLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile user={user} />
      <ScrollView
        refreshControl={RefreshSpinner(isRefreshing, onRefresh)}
        style={thisStyle.container}
      >
        <PlanCardList planList={plans.plan_list} />
      </ScrollView>
      <SettingFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    width: LAYOUT.window.width * 0.9
  }
});

export default ProfileScreen;
