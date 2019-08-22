import React from "react";
import { Text, View } from "react-native";

// from app
import { appTextStyle } from "app/src/styles/general-style";
import notificationScreenStyle from "app/src/styles/notification-screen-style";

/**
 * フォロー通知一覧画面
 */
const NotificationFollowScreen: React.FC = () => {
  return (
    <View style={notificationScreenStyle.container}>
      <Text style={appTextStyle.defaultText}>フォロー通知はありません。</Text>
    </View>
  );
};

export default NotificationFollowScreen;
