import React from "react";
import { StyleSheet } from "react-native";
import { Body, Left, ListItem, Text, Thumbnail } from "native-base";

// from app
import { IComment } from "app/src/interfaces/api/Comment";
import Colors from "app/src/constants/Colors";
import Images from "app/src/constants/Images";

interface Props {
  comment: IComment;
}

/**
 * コメントリスト要素コンポーネント
 * @author kotatanaka
 */
const CommentElement: React.FC<Props> = (props: Props) => {
  const { comment } = props;

  return (
    <ListItem avatar style={thisStyle.container}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text note style={thisStyle.nameText}>
          {comment.user_name}
        </Text>
        <Text style={thisStyle.commentText}>{comment.comment}</Text>
        <Text note style={thisStyle.dateText}>
          {comment.create_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  nameText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  commentText: {
    fontFamily: "genju-light",
    fontSize: 12
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});

export default CommentElement;
