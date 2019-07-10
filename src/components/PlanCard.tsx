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
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import MapView from "react-native-maps";

// from app
import { Plan, Region } from "app/src/constants/interfaces";
import images from "app/src/constants/images";
import { planCardStyle } from "app/src/styles/plan-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  plan: Plan;
}

/** デフォルトの位置情報(東京タワー) */
const INITIAL_REGION: Region = {
  latitude: 35.658581,
  longitude: 139.745433,
  latitudeDelta: 0.02,
  longitudeDelta: 0.05
};

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
        <CardItem cardBody>
          <MapView region={INITIAL_REGION} style={planCardStyle.map} />
        </CardItem>
        <CardItem>
          <Left>
            <Text style={planCardStyle.mainText}>{plan.title}</Text>
          </Left>
          <Right>
            <Text note style={planCardStyle.descriptionText}>
              {plan.description}
            </Text>
          </Right>
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
