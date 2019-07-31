import React from "react";
import { Text, View } from "react-native";

// from app
import appStyle from "app/src/styles/common-style";

/**
 * フォロー通知一覧画面
 */
const NotificationFollowScreen: React.FC = () => {
  return (
    <View>
      <Text style={appStyle.defaultText}>フォロー通知はありません。</Text>
    </View>
  );
};

export default NotificationFollowScreen;
