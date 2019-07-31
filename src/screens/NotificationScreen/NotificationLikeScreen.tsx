import React from "react";
import { Text, View } from "react-native";

// from app
import appStyle from "app/src/styles/common-style";

/**
 * お気に入り通知一覧画面
 */
const NotificationLikeScreen: React.FC = () => {
  return (
    <View>
      <Text style={appStyle.defaultText}>お気に入り通知はありません。</Text>
    </View>
  );
};

export default NotificationLikeScreen;
