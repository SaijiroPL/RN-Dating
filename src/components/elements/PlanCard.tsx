import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
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
        <Left style={thisStyle.planner}>
          <Thumbnail source={Images.noUserImage} small />
          <Body>
            <Text style={thisStyle.mainText} onPress={onUserPress}>
              {plan.user_name}
            </Text>
            <Text note style={thisStyle.mainText}>
              {plan.user_attr}
            </Text>
          </Body>
        </Left>
      </CardItem>
    );
  };

  return (
    <Card style={thisStyle.card}>
      <TouchableOpacity onPress={onPlanPress}>
        {!myPlan && renderPlannerHeader()}
        <CardItem cardBody>
          <Image source={Images.noImage} style={thisStyle.image} />
        </CardItem>
        <CardItem cardBody>
          <MapView
            region={{
              latitude: plan.spots[0].latitude,
              longitude: plan.spots[0].longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.05
            }}
            style={thisStyle.map}
          />
        </CardItem>
        <CardItem style={thisStyle.description}>
          <Text style={thisStyle.mainText}>{plan.title}</Text>
          <Text note style={thisStyle.descriptionText}>
            {plan.spots.map(spot => spot.spot_name).join(" > ")}
          </Text>
        </CardItem>
        <CardItem style={thisStyle.linkButtonGroup}>
          <Button
            transparent
            style={thisStyle.linkButton}
            onPress={onLikePress}
          >
            <SimpleLineIcons name="like" size={15} color={Colors.tintColor} />
            <Text style={thisStyle.linkButtonText}>{plan.like_count}</Text>
          </Button>
          <Button
            transparent
            style={thisStyle.linkButton}
            onPress={onCommentPress}
          >
            <FontAwesome name="comment-o" size={15} color={Colors.tintColor} />
            <Text style={thisStyle.linkButtonText}>{plan.comment_count}</Text>
          </Button>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  planner: {
    justifyContent: "center"
  },
  image: {
    flex: 1,
    height: 150
  },
  map: {
    flex: 1,
    height: 150
  },
  description: {
    alignItems: "flex-start",
    flexDirection: "column"
  },
  linkButtonGroup: {
    // backgroundColor: Colors.baseBackgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 0,
    marginBottom: 10
  },
  linkButton: {
    flex: 1,
    justifyContent: "center"
  },
  mainText: {
    fontFamily: "genju-medium",
    fontSize: 14
  },
  descriptionText: {
    fontFamily: "genju-light",
    fontSize: 12
  },
  linkButtonText: {
    color: Colors.tintColor,
    fontSize: 15
  }
});

export default PlanCard;
