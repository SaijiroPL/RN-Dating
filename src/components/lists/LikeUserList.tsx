import React from "react";
import { FlatList } from "react-native";

// from app
import { LikeUser } from "app/src/types/api/TLike";
import LikeUserElement from "app/src/components/elements/LikeUserElement";

interface Props {
  users: Array<LikeUser>;
}

/**
 * デートプランお気に入り登録者リストコンポーネント
 * @author kotatanaka
 */
const LikeUserList: React.FC<Props> = (props: Props) => {
  const { users } = props;

  const renderLikeUserElement = ({ item }: { item: LikeUser }) => {
    return <LikeUserElement user={item} />;
  };

  return (
    <FlatList
      data={users}
      renderItem={renderLikeUserElement}
      keyExtractor={item => item.user_id}
    />
  );
};

export default LikeUserList;
