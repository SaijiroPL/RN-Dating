import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import { RefreshSpinner } from "app/src/components/Spinners";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * お気に入り通知一覧画面
 * @author kotatanaka
 */
const NotificationLikeScreen: React.FC = () => {
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
            お気に入り通知はありません。
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

export default NotificationLikeScreen;
