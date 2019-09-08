import React from "react";
import { FlatList } from "react-native";

// from app
import { ILikeUser } from "app/src/interfaces/api/Like";
import LikeUserElement from "app/src/components/elements/LikeUserElement";

interface Props {
  users: Array<ILikeUser>;
}

/**
 * デートプランお気に入り登録者リストコンポーネント
 * @author kotatanaka
 */
const LikeUserList: React.FC<Props> = (props: Props) => {
  const { users } = props;

  const renderLikeUserElement = ({ item }: { item: ILikeUser }) => {
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
