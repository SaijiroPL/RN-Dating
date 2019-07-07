import React from "react";
import { Image } from "react-native";
import {
  Content,
  Item,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import axiosBase from "axios";

// from app
import { PlanFull } from "app/src/constants/interfaces";
import images from "app/src/constants/images";
import layout from "app/src/constants/layout";

interface Props {
  navigation: any;
}

interface State {
  plan: any;
  errors: any;
}

// FIXME 設定ファイルに定義する
const plansApiBaseUrl = "http://localhost:3000/plans";
const axios = axiosBase.create({ baseURL: plansApiBaseUrl });

/**
 * デートプラン詳細画面
 * @author kotatanaka
 */
export default class PlanDetailScreen extends React.Component<Props, State> {
  public state: State = {
    plan: {
      plan_id: "",
      title: "",
      description: "",
      date: "",
      transportation: [],
      need_time: "",
      create_date: "",
      spots: [],
      user_name: "",
      user_image_url: "",
      like_count: 0,
      is_liked: false
    },
    errors: []
  };

  componentDidMount() {
    this.getPlanDetail();
  }

  /** デートプラン詳細取得 */
  getPlanDetail() {
    axios
      .get("/" + this.props.navigation.state.params.id)
      .then((response: { data: PlanFull }) => {
        this.setState({ plan: response.data });
      })
      .catch((error: any) => {
        this.setState({ errors: error });
      });
  }

  render() {
    const { plan } = this.state;

    return (
      <Content>
        <Text>デートプラン詳細</Text>
        <Item>
          <Left>
            <Thumbnail source={images.noImage} />
            <Body>
              <Text>{plan.user_name}</Text>
              <Text note>一般ユーザー</Text>
            </Body>
          </Left>
        </Item>
        <Item>
          <Image
            source={images.noImage}
            style={{ height: 200, width: layout.window.width }}
          />
        </Item>
        <Item>
          <Left>
            <Text>{plan.title}</Text>
          </Left>
          <Right>
            <Text note style={{ fontSize: 12 }}>
              {plan.create_date.substr(0, 10)}
            </Text>
          </Right>
        </Item>
        <Item>
          <Left>
            <Text note style={{ fontSize: 12 }}>
              {plan.description}
            </Text>
          </Left>
        </Item>
        <Item>
          <Left>
            <Button transparent>
              <Text>{plan.like_count} Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Text>4 Comments</Text>
            </Button>
          </Body>
        </Item>
      </Content>
    );
  }
}
