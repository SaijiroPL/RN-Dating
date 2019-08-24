import React from "react";
import { View } from "react-native";
import { Thumbnail, Text, Left, Body } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

// from app
import { Comment } from "app/src/types/api/TComment";
import Images from "app/src/constants/Images";
import { isNotNullOrUndefined } from "app/src/utils/CheckUtil";
import { commentGridStyle } from "app/src/styles/common-component-style";

interface Props {
  comments: Array<Comment>;
}

/**
 * コメントグリッド表示
 * @author kotatanaka
 */
const CommentGrid: React.FC<Props> = (props: Props) => {
  const { comments } = props;

  // 1つのコメントを描画する
  const renderComment = (comment: Comment) => {
    if (isNotNullOrUndefined(comment)) {
      return (
        <Row style={commentGridStyle.item}>
          <View style={commentGridStyle.thumbnail}>
            <Thumbnail small source={Images.noUserImage} />
          </View>
          <View style={commentGridStyle.comment}>
            <Text note style={commentGridStyle.nameText}>
              {comment.user_name}
            </Text>
            <Text style={commentGridStyle.commentText}>{comment.comment}</Text>
            <Text note style={commentGridStyle.dateText}>
              {comment.create_date.substr(0, 10)}
            </Text>
          </View>
        </Row>
      );
    }
  };

  return (
    <Grid style={commentGridStyle.container}>
      <Col>
        {renderComment(comments[0] as Comment)}
        {renderComment(comments[2] as Comment)}
      </Col>
      <Col>
        {renderComment(comments[1] as Comment)}
        {renderComment(comments[3] as Comment)}
      </Col>
    </Grid>
  );
};

export default CommentGrid;
