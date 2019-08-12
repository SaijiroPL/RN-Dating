import React from "react";
import { FlatList } from "react-native";

// from app
import { Comment } from "app/src/types/api/TComment";
import CommentElement from "app/src/components/elements/CommentElement";

interface Props {
  commentList: Array<Comment>;
}

/**
 * コメントリストコンポーネント
 * @author kotatanaka
 */
const CommentList: React.FC<Props> = ({ commentList }) => {
  const renderCommentList = ({ item }: { item: Comment }) => {
    return <CommentElement comment={item} />;
  };

  return (
    <FlatList
      data={commentList}
      renderItem={renderCommentList}
      keyExtractor={item => item.comment_id}
    />
  );
};

export default CommentList;
