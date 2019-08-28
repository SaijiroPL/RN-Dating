import React from "react";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";

// from app
import { Comment } from "app/src/types/api/TComment";
import Images from "app/src/constants/Images";
import { commentElementStyle } from "app/src/styles/common-component-style";

interface Props {
  comment: Comment;
}

/**
 * コメントリスト要素コンポーネント
 * @author kotatanaka
 */
const CommentElement: React.FC<Props> = (props: Props) => {
  const { comment } = props;

  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text note style={commentElementStyle.nameText}>
          {comment.user_name}
        </Text>
        <Text style={commentElementStyle.commentText}>{comment.comment}</Text>
        <Text note style={commentElementStyle.dateText}>
          {comment.create_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

export default CommentElement;
