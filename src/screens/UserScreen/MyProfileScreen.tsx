import React from "react";
import { StyleSheet, View } from "react-native";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { UserProfile } from "app/src/components/Content";
import { SettingFab } from "app/src/components/Button";
import { useGetUserDetail } from "app/src/hooks";

/**
 * マイプロフィール画面
 * @author kotatanaka
 */
const MyProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** ユーザー詳細取得 */
  const { isLoading, user } = useGetUserDetail(loginUser.id);

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      <UserProfile user={user} me />
      <SettingFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default MyProfileScreen;
