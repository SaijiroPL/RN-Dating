import React from "react";
import { FlatList } from "react-native";

// from app
import { IFollow } from "app/src/interfaces/api/Follow";
import { FollowElement } from "app/src/components/Element";

interface Props {
  follows: Array<IFollow>;
}

/**
 * フォローリスト/フォロワーリストコンポーネント
 * @author kotatanaka
 */
export const FollowList: React.FC<Props> = (props: Props) => {
  const { follows } = props;

  const renderFollowElement = ({ item }: { item: IFollow }) => {
    return <FollowElement follow={item} />;
  };

  return (
    <FlatList
      data={follows}
      renderItem={renderFollowElement}
      keyExtractor={item => item.user_id}
    />
  );
};