import React from "react";
import { View, FlatList } from "react-native";
import { Constants } from "expo";
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
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import axiosBase from "axios";

// from app
import {
  CommentList,
  Comment,
  BadRequestError
} from "app/src/constants/interfaces";
import images from "app/src/constants/images";
import appStyle from "app/src/styles/common-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  comments: CommentList;
  errors: BadRequestError;
}

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/plans"
});

/**
 * コメント一覧画面
 * @author kotatanaka
 */
export default class CommentScreen extends React.Component<Props> {
  public state: State = {
    comments: { total: 0, comment_list: [] },
    errors: { code: 0, message: "", detail_massage: [] }
  };

  componentDidMount() {
    this.getCommentList();
  }

  /** コメント一覧取得 */
  getCommentList() {
    const { navigation } = this.props;

    axios
      .get("/" + navigation.state.params.id + "/comments")
      .then((response: { data: CommentList }) => {
        this.setState({ comments: response.data });
      })
      .catch((error: BadRequestError) => {
        this.setState({ errors: error });
      });
  }

  /** コメントリストの要素を描画する */
  renderCommentList = ({ item }: { item: Comment }) => {
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

  render() {
    const { comments } = this.state;

    return (
      <Container>
        <Text>コメント数 {comments.total}</Text>
        <FlatList
          data={comments.comment_list}
          renderItem={this.renderCommentList}
          keyExtractor={(item, index) => item.comment_id}
        />
      </Container>
    );
  }
}
