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
  Right,
  Item
} from "native-base";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import MapView from "react-native-maps";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

// from app
import { Plan, Region } from "app/src/constants/interfaces";
import images from "app/src/constants/images";
import colors from "app/src/constants/colors";
import { planCardStyle } from "app/src/styles/plan-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
                {plan.user_attr}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={images.noImage} style={planCardStyle.image} />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: plan.representative_spot.latitude,
              longitude: plan.representative_spot.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05
            }}
            style={planCardStyle.map}
          />
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
        <Item style={planCardStyle.linkButtonGroup}>
          <Button transparent style={planCardStyle.linkButton}>
            <SimpleLineIcons
              name="like"
              size={20}
              style={planCardStyle.linkIcon}
              color={colors.tintColor}
            />
            <Text style={planCardStyle.linkButtonText}>{plan.like_count}</Text>
          </Button>
          <Button transparent style={planCardStyle.linkButton}>
            <FontAwesome
              name="comment-o"
              size={20}
              style={planCardStyle.linkIcon}
              color={colors.tintColor}
            />
            <Text style={planCardStyle.linkButtonText}>4</Text>
          </Button>
        </Item>
      </TouchableOpacity>
    </Card>
  );
};

export default PlanCard;
