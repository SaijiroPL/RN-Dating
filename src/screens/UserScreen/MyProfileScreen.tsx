import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// from app
import { useGlobalState } from 'app/src/Store';
import { LoadingSpinner, RefreshSpinner } from 'app/src/components/Spinners';
import { UserProfile } from 'app/src/components/Content';
import { SettingFab } from 'app/src/components/Button';
import {
  useGetUserDetail,
  useGetPlanList,
  useUploadImage,
} from 'app/src/hooks';
import { PlanCardList } from 'app/src/components/List';
import { LAYOUT } from 'app/src/constants';

/**
 * マイプロフィール画面
 * @author kotatanaka
 */
const MyProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** ユーザー詳細取得 */
  const { isUserLoading, user } = useGetUserDetail(loginUser.id, loginUser.id);

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
    <View style={thisStyle.container}>
      <UserProfile user={user} me image={image} pickImage={pickImage} />
      <ScrollView
        refreshControl={RefreshSpinner(isRefreshing, onRefresh)}
        style={thisStyle.scroll}
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    width: LAYOUT.window.width * 0.9,
  },
});

export default MyProfileScreen;
