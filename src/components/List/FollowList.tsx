import React from "react";
import { FlatList } from "react-native";

// from app
import { IFollow, IFollower } from "app/src/interfaces/api/Follow";
import { FollowElement } from "app/src/components/Element";

interface Props {
  follows?: Array<IFollow>;
  followers?: Array<IFollower>;
}

/**
 * フォローリスト/フォロワーリストコンポーネント
 * @author kotatanaka
 */
export const FollowList: React.FC<Props> = (props: Props) => {
  const { follows, followers } = props;

  /** フォローリスト要素の描画 */
  const renderFollow = ({ item }: { item: IFollow }) => {
    return <FollowElement follow={item} />;
  };

  /** フォロワーリスト要素の描画 */
  const renderFollower = ({ item }: { item: IFollower }) => {
    return <FollowElement follower={item} />;
  };

  // フォローリスト
  if (follows && !followers) {
    return (
      <FlatList
        data={follows}
        renderItem={renderFollow}
        keyExtractor={item => item.user_id}
      />
    );
  }

  // フォロワーリスト
  if (!follows && followers) {
    return (
      <FlatList
        data={followers}
        renderItem={renderFollower}
        keyExtractor={item => item.user_id}
      />
    );
  }

  return <></>;
};
