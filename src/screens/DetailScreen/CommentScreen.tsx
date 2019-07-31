import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import axiosBase from "axios";

// from app
import {
  CommentList,
  Comment,
  BadRequestError
} from "app/src/constants/interfaces";
import images from "app/src/constants/images";

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/plans"
});

/**
 * コメント一覧画面
 * @author kotatanaka
 */
const CommentScreen: React.FC = () => {
  const commentId = useNavigationParam("id");

  const [comments, setComments] = useState({
    total: 0,
    comment_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });

  useEffect(() => {
    getCommentList();
  }, []);

  /** コメント一覧取得 */
  const getCommentList = () => {
    axios
      .get("/" + commentId + "/comments")
      .then((response: { data: CommentList }) => {
        setComments(Object.assign(response.data));
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
      });
  };

  /** コメントリストの要素を描画する */
  const renderCommentList = ({ item }: { item: Comment }) => {
    return (
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={images.noUserImage} />
            </Left>
            <Body>
              <Text note>{item.user_name}</Text>
              <Text>{item.comment}</Text>
            </Body>
            <Right>
              <Text note>{item.create_date.substr(0, 10)}</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  };

  return (
    <Container>
      <Text>コメント数 {comments.total}</Text>
      <FlatList
        data={comments.comment_list}
        renderItem={renderCommentList}
        keyExtractor={item => item.comment_id}
      />
    </Container>
  );
};

export default CommentScreen;
