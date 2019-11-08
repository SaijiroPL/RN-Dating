import React from "react";
import { View, ScrollView } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import { UserProfile } from "app/src/components/Content";
import { SettingFab } from "app/src/components/Button";
import { useGetUserDetail, useGetPlanList } from "app/src/hooks";
import { appStyle } from "app/src/styles";
import { PlanCardList } from "app/src/components/List";

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
  const { isLoading, user } = useGetUserDetail(userId, loginUser.id);

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  /** デートプラン取得 */
  const { plans, errors, isRefreshing, onRefresh } = useGetPlanList();

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile user={user} />
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} />
      </ScrollView>
      　<SettingFab />
    </View>
  );
};

export default ProfileScreen;
