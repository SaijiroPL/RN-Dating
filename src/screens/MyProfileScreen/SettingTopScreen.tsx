import React from "react";
import { Text, View } from "react-native";

// from app
import profileScreenStyle from "app/src/styles/profile-screen-style";

/**
 * 設定成画面トップ
 */
const SettingTopScreen: React.FC = () => {
  return (
    <View style={profileScreenStyle.container}>
      <Text>設定一覧</Text>
    </View>
  );
};

export default SettingTopScreen;
