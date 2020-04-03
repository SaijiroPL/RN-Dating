import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// from app
import { useGlobalState } from 'app/src/Store';
import { COLOR } from 'app/src/constants';
import { RefreshSpinner } from 'app/src/components/Spinners';
import { NotificationList } from 'app/src/components/List';
import { useGetNotificationList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/**
 * 通知一覧画面
 * @author kotatanaka
 */
const NotificationAllScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** 通知一覧取得 */
  const {
    isLoading,
    isRefreshing,
    onRefresh,
    notifications,
    errors,
  } = useGetNotificationList(loginUser.id);

  return (
    <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
      <View style={thisStyle.container}>
        {notifications.notification_list.length ? (
          <NotificationList
            notificationList={notifications.notification_list}
          />
        ) : (
          <Text style={appTextStyle.defaultText}>通知はありません。</Text>
        )}
      </View>
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
  },
});

export default NotificationAllScreen;
