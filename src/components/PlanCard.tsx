import React, { FC } from "react";

import { Image, TouchableOpacity } from "react-native";
import {
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
import { planCardStyle } from "app/src/styles/plan-style";

interface Props {
  navigation: any;
  plan: Plan;
}

/**
 * ホーム画面で使用するデートプランコンポーネント
 * @author kotatanaka
 */
const PlanCard: FC<Props> = ({ navigation, plan }) => {
  const onPlanPress = () => {
    navigation.navigate("detail", { id: plan.plan_id });
  };

  return (
    // TODO カードレイアウトにする
    <Card style={planCardStyle.card}>
      <TouchableOpacity onPress={onPlanPress}>
        <CardItem>
          <Left>
            <Thumbnail source={images.noImage} />
            <Body>
              <Text style={planCardStyle.mainText}>{plan.user_name}</Text>
              <Text note style={planCardStyle.mainText}>
                一般ユーザー
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={images.noImage} style={planCardStyle.image} />
        </CardItem>
        <CardItem>
          <Left>
            <Text style={planCardStyle.mainText}>{plan.title}</Text>
          </Left>
          <Right>
            <Text note style={planCardStyle.descriptionText}>
              {plan.create_date.substr(0, 10)}
            </Text>
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text note style={planCardStyle.descriptionText}>
              {plan.description}
            </Text>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Text style={planCardStyle.mainText}>
                {plan.like_count} Likes
              </Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Text style={planCardStyle.mainText}>4 Comments</Text>
            </Button>
          </Body>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

export default PlanCard;
