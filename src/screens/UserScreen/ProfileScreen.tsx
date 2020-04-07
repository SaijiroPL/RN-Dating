import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

// from app
import { useGlobalState } from 'app/src/Store';
import { LAYOUT } from 'app/src/constants';
import { LoadingSpinner, RefreshSpinner } from 'app/src/components/Spinners';
import { UserProfile } from 'app/src/components/Content';
import { SettingFab } from 'app/src/components/Button';
import { PlanCardList } from 'app/src/components/List';
import { useGetUserDetail, useGetPlanList, useFollowUser } from 'app/src/hooks';
import { IUserNavigationParam } from 'app/src/interfaces/app/Navigation';
import { appStyle } from 'app/src/styles';

/**
 * プロフィール(ユーザー詳細)画面トップ
 * @author kotatanaka
 */
const ProfileScreen: React.FC = () => {
  const route = useRoute();
  const planNavigationParam = route.params as IUserNavigationParam;

  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** ユーザー詳細取得 */
  const { isUserLoading, user, getUserDetail } = useGetUserDetail(
    planNavigationParam.userId,
    loginUser.id,
  );

  /** デートプラン取得 */
  const { isPlanListLoading, plans, isRefreshing, onRefresh } = useGetPlanList(
    planNavigationParam.userId,
  );

  /** フォロー・フォロー解除 */
  const { follow, unfollow } = useFollowUser(loginUser.id);

  // ローディング
  if (isUserLoading || isPlanListLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile
        user={user}
        follow={follow}
        unfollow={unfollow}
        reload={getUserDetail}
      />
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
    width: LAYOUT.window.width * 0.9,
  },
});

export default ProfileScreen;
