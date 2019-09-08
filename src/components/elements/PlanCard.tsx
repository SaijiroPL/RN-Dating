import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import {
  Body,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Thumbnail
} from "native-base";
import MapView from "react-native-maps";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

// from app
import { IPlan } from "app/src/interfaces/api/Plan";
import Images from "app/src/constants/Images";
import Colors from "app/src/constants/Colors";
import { planCardStyle } from "app/src/styles/common-component-style";

interface Props {
  plan: IPlan;
  myPlan?: boolean;
}

/**
 * デートプランコンポーネント
 * @author kotatanaka
 */
const PlanCard: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { plan, myPlan } = props;

  const onPlanPress = () => {
    navigate("detail", { id: plan.plan_id });
  };

  const onCommentPress = () => {
    navigate("comment", { id: plan.plan_id });
  };

  const onLikePress = () => {
    navigate("like", { id: plan.plan_id });
  };

  const onUserPress = () => {
    navigate("profile", { id: plan.user_id });
  };

  /** プラン作成者ヘッダーを描画する */
  const renderPlannerHeader = () => {
    return (
      <CardItem>
        <Left style={planCardStyle.planner}>
          <Thumbnail source={Images.noUserImage} small />
          <Body>
            <Text style={planCardStyle.mainText} onPress={onUserPress}>
              {plan.user_name}
            </Text>
            <Text note style={planCardStyle.mainText}>
              {plan.user_attr}
            </Text>
          </Body>
        </Left>
      </CardItem>
    );
  };

  return (
    <Card style={planCardStyle.card}>
      <TouchableOpacity onPress={onPlanPress}>
        {!myPlan && renderPlannerHeader()}
        <CardItem cardBody>
          <Image source={Images.noImage} style={planCardStyle.image} />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: plan.spots[0].latitude,
              longitude: plan.spots[0].longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05
            }}
            style={planCardStyle.map}
          />
        </CardItem>
        <CardItem style={planCardStyle.description}>
          <Text style={planCardStyle.mainText}>{plan.title}</Text>
          <Text note style={planCardStyle.descriptionText}>
            {plan.spots.map(spot => spot.spot_name).join(" > ")}
          </Text>
        </CardItem>
        <CardItem style={planCardStyle.linkButtonGroup}>
          <Button
            transparent
            style={planCardStyle.linkButton}
            onPress={onLikePress}
          >
            <SimpleLineIcons name="like" size={15} color={Colors.tintColor} />
            <Text style={planCardStyle.linkButtonText}>{plan.like_count}</Text>
          </Button>
          <Button
            transparent
            style={planCardStyle.linkButton}
            onPress={onCommentPress}
          >
            <FontAwesome name="comment-o" size={15} color={Colors.tintColor} />
            <Text style={planCardStyle.linkButtonText}>
              {plan.comment_count}
            </Text>
          </Button>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

export default PlanCard;
