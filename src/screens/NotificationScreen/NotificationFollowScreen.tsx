import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import { RefreshSpinner } from "app/src/components/Spinners";
import appTextStyle from "app/src/styles/GeneralTextStyle";

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
      <View style={thisStyle.container}>
        {!notifications.length && (
          <Text style={appTextStyle.defaultText}>
            フォロー通知はありません。
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor
  }
});

export default NotificationFollowScreen;
