import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Left, ListItem, Text, Thumbnail, View } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

// from app
import { COLOR, IMAGE, LAYOUT } from 'app/src/constants';
import { INotification } from 'app/src/interfaces/api/Notification';

interface Props {
  notification: INotification;
}

/**
 * 通知リスト要素(お気に入り通知)コンポーネント
 * @author kotatanaka
 */
export const NotificationLikeElement: React.FC<Props> = (props: Props) => {
  const { notification } = props;

  return (
    <ListItem avatar style={thisStyle.container}>
      <Left>
        <Thumbnail small source={IMAGE.noUserImage} />
      </Left>
      <Body style={thisStyle.bodyContainer}>
        <View style={thisStyle.titleContainer}>
          <AntDesign name="hearto" size={20} style={thisStyle.likeIcon} />
          <Text style={thisStyle.titleLinkText}>{notification.user_name}</Text>
          <Text style={thisStyle.titleText}>
            {' '}
            さんがお気に入りに登録しました。
          </Text>
        </View>
        <Text note style={thisStyle.planTitleText}>
          {notification.plan_title}
        </Text>
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
  bodyContainer: {
    width: LAYOUT.window.width * 0.6,
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
  planTitleText: {
    fontFamily: 'genju-medium',
    fontSize: 12,
  },
  dateText: {
    fontFamily: 'genju-light',
    fontSize: 10,
  },
  likeIcon: {
    color: COLOR.tintColor,
    marginRight: 5,
  },
});
