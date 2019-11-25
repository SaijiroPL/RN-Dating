import React from "react";
import { FlatList, View } from "react-native";

// from app
import { NOTIFICATION_CATEGORY } from "app/src/constants/Enum";
import { INotification } from "app/src/interfaces/api/Notification";
import {
  NotificationFollowElement,
  NotificationLikeElement,
  NotificationCommentElement
} from "app/src/components/Element";

interface Props {
  notificationList: Array<INotification>;
}

/**
 * 通知リストコンポーネント
 * @author kotatanaka
 */
export const NotificationList: React.FC<Props> = (props: Props) => {
  const { notificationList } = props;

  /** 通知リスト要素の描画 */
  const renderNotificationElement = ({ item }: { item: INotification }) => {
    switch (item.notification_category) {
      case NOTIFICATION_CATEGORY.FOLLOW:
        return <NotificationFollowElement notification={item} />;
      case NOTIFICATION_CATEGORY.LIKE:
        return <NotificationLikeElement notification={item} />;
      case NOTIFICATION_CATEGORY.COMMENT:
        return <NotificationCommentElement notification={item} />;
      default:
        return <View />;
    }
  };

  return (
    <FlatList
      data={notificationList}
      renderItem={renderNotificationElement}
      keyExtractor={item => `${item.notification_id}`}
    />
  );
};
