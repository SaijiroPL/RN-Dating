import React from 'react';
import { View } from 'react-native';

// from app
import { useGlobalState } from 'app/src/Store';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { UserProfile } from 'app/src/components/Content';
import { SettingFab } from 'app/src/components/Button';
import {
  useGetUserDetail,
  useGetPlanList,
  useUploadImage,
} from 'app/src/hooks';
import { PlanCardList } from 'app/src/components/List';
import { appStyle } from 'app/src/styles';

/** マイプロフィール画面 */
const MyProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** ユーザー詳細取得 */
  const { isUserLoading, user, getUserDetail } = useGetUserDetail(
    loginUser.id,
    loginUser.id,
  );

  /** デートプラン取得 */
  const { plans, isPlanListLoading, isRefreshing, onRefresh } = useGetPlanList(
    loginUser.id,
  );

  /** 画像選択アップロード */
  const { image, pickImage } = useUploadImage();

  // ローディング
  if (isUserLoading || isPlanListLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile
        user={user}
        me
        image={image}
        pickImage={pickImage}
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

export default MyProfileScreen;
