import React from "react";
import {
  Content,
  ListItem,
  List,
  Thumbnail,
  Text,
  Left,
  Body,
  Right
} from "native-base";

// from app
import { Comment } from "app/src/types/api/TComment";
import Images from "app/src/constants/Images";
import { commentStyle } from "app/src/styles/comment-component-style";

interface Props {
  comment: Comment;
}

/**
 * コメントリスト要素コンポーネント
 * @author kotatanaka
 */
const CommentElement: React.FC<Props> = ({ comment }) => {
  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text note style={commentStyle.nameText}>
          {comment.user_name}
        </Text>
        <Text style={commentStyle.commentText}>{comment.comment}</Text>
        <Text note style={commentStyle.dateText}>
          {comment.create_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

export default CommentElement;
