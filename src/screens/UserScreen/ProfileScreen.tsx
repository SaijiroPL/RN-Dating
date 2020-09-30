import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLOR } from 'app/src/constants';

// from app
import { useGlobalState } from 'app/src/Store';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { UserProfile } from 'app/src/components/Content';
import { SettingFab } from 'app/src/components/Button';
import { PlanCardList } from 'app/src/components/List';
import { useGetUserDetail, useGetPlanList, useFollowUser } from 'app/src/hooks';
import { IUserNavigationParam } from 'app/src/interfaces/app/Navigation';
import { appStyle } from 'app/src/styles';

/** プロフィール(ユーザー詳細)画面トップ */
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
    <View style={thisStyle.container}>
      <UserProfile
        user={user}
        follow={follow}
        unfollow={unfollow}
        reload={getUserDetail}
      />
      <PlanCardList
        planList={plans.plan_list}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <SettingFab />
    </View>
  );
};

const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
