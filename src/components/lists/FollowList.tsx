import React from "react";
import { FlatList } from "react-native";

// from app
import { Follow } from "app/src/types/api/TFollow";
import FollowElement from "app/src/components/elements/FollowElement";

interface Props {
  follows: Array<Follow>;
}

/**
 * フォローリスト/フォロワーリストコンポーネント
 * @author kotatanaka
 */
const FollowList: React.FC<Props> = ({ follows }) => {
  const renderFollowElement = ({ item }: { item: Follow }) => {
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

export default FollowList;
