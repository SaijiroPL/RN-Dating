import React from 'react';
import { FlatList } from 'react-native';

// from app
import { IInformation } from 'app/src/interfaces/api/Notification';
import { InformationElement } from 'app/src/components/Element';

interface Props {
  informationList: Array<IInformation>;
}

/**
 * 運営からのお知らせリストコンポーネント
 * @author kotatanaka
 */
export const InformationList: React.FC<Props> = (props: Props) => {
  const { informationList } = props;

  /** 運営からのお知らせリスト要素の描画 */
  const renderNotificationElement = ({
    item,
  }: {
    item: IInformation;
  }): JSX.Element => {
    return <InformationElement notification={item} />;
  };

  return (
    <FlatList
      data={informationList}
      renderItem={renderNotificationElement}
      keyExtractor={(item) => `${item.notification_id}`}
    />
  );
};
