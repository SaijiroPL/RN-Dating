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
  Text,
  Spinner
} from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { CommentList, Comment } from "app/src/types/api/TComment";
import { BadRequestError } from "app/src/types/api/TError";
import Images from "app/src/constants/Images";

/**
 * コメント一覧画面
 * @author kotatanaka
 */
const CommentScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [comments, setComments] = useState({
    total: 0,
    comment_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getCommentList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** コメント一覧取得 */
  const getCommentList = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/plans/" + planId + "/comments";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: CommentList }) => {
        setComments(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          console.log("API Error: " + error.message);
        }
      });
  };

  /** コメントリストの要素を描画する */
  const renderCommentList = ({ item }: { item: Comment }) => {
    return (
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={Images.noUserImage} />
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

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

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
