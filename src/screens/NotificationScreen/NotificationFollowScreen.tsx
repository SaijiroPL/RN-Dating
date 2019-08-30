import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

// from app
import { appTextStyle } from "app/src/styles/general-style";
import { RefreshSpinner } from "app/src/components/Spinners";
import notificationScreenStyle from "app/src/styles/notification-screen-style";

/**
 * フォロー通知一覧画面
 * @author kotatanaka
 */
const NotificationFollowScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
      <View style={notificationScreenStyle.container}>
        {!notifications.length && (
          <Text style={appTextStyle.defaultText}>
            フォロー通知はありません。
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default NotificationFollowScreen;
