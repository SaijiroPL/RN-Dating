import React from "react";

import { Image } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";

// from app
import { Plan } from "app/src/constants/interfaces";
import images from "app/src/constants/images";
import layout from "app/src/constants/layout";

/**
 * ホーム画面で使用するデートプランコンポーネント
 * @author kotatanaka
 */
export const HomePlan = (plan: Plan) => (
  <Content>
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={images.noImage} />
          <Body>
            <Text>{plan.user_name}</Text>
            <Text note>一般ユーザー</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={images.noImage}
          style={{ height: 200, width: layout.window.width }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Text>{plan.title}</Text>
        </Left>
        <Right>
          <Text note style={{ fontSize: 12 }}>
            {plan.create_date.substr(0, 10)}
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
