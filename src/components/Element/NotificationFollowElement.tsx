import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Left, ListItem, Text, Thumbnail, View } from 'native-base';
import { SimpleLineIcons } from '@expo/vector-icons';

// from app
import { COLOR, IMAGE } from 'app/src/constants';
import { INotification } from 'app/src/interfaces/api/Notification';

interface Props {
  notification: INotification;
}

/**
 * 通知リスト要素(フォロー通知)コンポーネント
 * @author kotatanaka
 */
export const NotificationFollowElement: React.FC<Props> = (props: Props) => {
  const { notification } = props;

  return (
    <ListItem avatar style={thisStyle.container}>
      <Left>
        <Thumbnail small source={IMAGE.noUserImage} />
      </Left>
      <Body>
        <View style={thisStyle.titleContainer}>
          <SimpleLineIcons
            name="user-follow"
            size={20}
            style={thisStyle.followIcon}
          />
          <Text style={thisStyle.titleLinkText}>{notification.user_name} </Text>
          <Text style={thisStyle.titleText}>
            さんがあなたをフォローしました。
          </Text>
        </View>
        <Text note style={thisStyle.dateText}>
          {notification.notification_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: 'genju-medium',
    fontSize: 14,
  },
  titleLinkText: {
    fontFamily: 'genju-medium',
    fontSize: 14,
    textDecorationColor: COLOR.inactiveColor,
    textDecorationLine: 'underline',
  },
  dateText: {
    fontFamily: 'genju-light',
    fontSize: 10,
  },
  followIcon: {
    color: COLOR.tintColor,
    marginRight: 5,
  },
});
