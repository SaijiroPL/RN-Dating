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

interface Props {
  comment: Comment;
}

/**
 * コメントリスト要素コンポーネント
 * @author kotatanaka
 */
const CommentElement: React.FC<Props> = ({ comment }) => {
  return (
    <Content>
      <List>
        <ListItem avatar>
          <Left>
            <Thumbnail source={Images.noUserImage} />
          </Left>
          <Body>
            <Text note>{comment.user_name}</Text>
            <Text>{comment.comment}</Text>
          </Body>
          <Right>
            <Text note>{comment.create_date.substr(0, 10)}</Text>
          </Right>
        </ListItem>
      </List>
    </Content>
  );
};

export default CommentElement;
