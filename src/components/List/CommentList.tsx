import React from "react";
import { FlatList } from "react-native";

// from app
import { IComment } from "app/src/interfaces/api/Comment";
import CommentElement from "app/src/components/elements/CommentElement";

interface Props {
  commentList: Array<IComment>;
}

/**
 * コメントリストコンポーネント
 * @author kotatanaka
 */
export const CommentList: React.FC<Props> = (props: Props) => {
  const { commentList } = props;

  const renderCommentElement = ({ item }: { item: IComment }) => {
    return <CommentElement comment={item} />;
  };

  return (
    <FlatList
      data={commentList}
      renderItem={renderCommentElement}
      keyExtractor={item => item.comment_id}
    />
  );
};
