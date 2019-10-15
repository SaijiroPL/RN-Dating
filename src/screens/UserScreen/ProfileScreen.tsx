import React from "react";
import { View } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { UserProfile } from "app/src/components/Content";
import { SettingFab } from "app/src/components/Button";
import { useGetUserDetail } from "app/src/hooks";
import { appStyle } from "app/src/styles";

/**
 * プロフィール(ユーザー詳細)画面トップ
 * @author kotatanaka
 */
const ProfileScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** ユーザー詳細取得 */
  const { isLoading, user } = useGetUserDetail(userId);

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile user={user} />
      <SettingFab />
    </View>
  );
};

export default ProfileScreen;
