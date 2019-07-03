import React from "react";

import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

// from app
import styles from "./styles";

interface Plan {
  plan_id: string;
  title: string;
  description: string;
  create_date: string;
  representative_spot: string;
  user_name: string;
  user_image_url: string;
  like_count: number;
}

/**
 * ホーム画面で使用するデートプランコンポーネント
 * @author kotatanaka
 */
export const HomePlan = (plan: Plan) => (
  <Content>
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: "Image URL" }} />
          <Body>
            <Text>{plan.user_name}</Text>
            <Text note>一般ユーザー</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: "Image URL" }}
          style={{ height: 200, width: null }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Text>{plan.title}</Text>
        </Left>
        <Right>
          <Text note style={{ fontSize: 12 }}>
            {plan.create_date}
          </Text>
        </Right>
      </CardItem>
      <CardItem>
        <Left>
          <Text note style={{ fontSize: 12 }}>
            {plan.description}
          </Text>
        </Left>
      </CardItem>
      <CardItem>
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
      </CardItem>
    </Card>
  </Content>
);
