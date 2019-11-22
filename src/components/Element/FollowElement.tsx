import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { COLOR, IMAGE } from "app/src/constants";
import { IFollow, IFollower } from "app/src/interfaces/api/Follow";

interface Props {
  follow?: IFollow;
  follower?: IFollower;
}

/**
 * フォロー/フォロワーリスト要素コンポーネント
 * @author kotatanaka
 */
export const FollowElement: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { follow, follower } = props;

  /** ユーザー押下時の処理 */
  const onPress = () => {
    const followUserId = follow && !follower ? follow.user_id : "";
    const followerUserId = !follow && follower ? follower.user_id : "";

    if (followUserId) {
      navigate("profile", { id: followUserId });
    } else if (followUserId) {
      navigate("profile", { id: followerUserId });
    }
  };

  // フォローリスト
  if (follow && !follower) {
    return (
      <ListItem avatar onPress={onPress} style={thisStyle.container}>
        <Left>
          <Thumbnail source={IMAGE.noUserImage} />
        </Left>
        <Body>
          <Text style={thisStyle.nameText}>{follow.user_name}</Text>
          <Text style={thisStyle.idText}>@{follow.user_id}</Text>
          <Text note style={thisStyle.dateText}>
            followd at {follow.follow_date.substr(0, 10)}
          </Text>
        </Body>
      </ListItem>
    );
  }

  // フォロワーリスト
  if (!follow && follower) {
    return (
      <ListItem avatar onPress={onPress} style={thisStyle.container}>
        <Left>
          <Thumbnail source={IMAGE.noUserImage} />
        </Left>
        <Body>
          <Text style={thisStyle.nameText}>{follower.user_name}</Text>
          <Text style={thisStyle.idText}>@{follower.user_id}</Text>
          <Text note style={thisStyle.dateText}>
            followd at {follower.followed_date.substr(0, 10)}
          </Text>
        </Body>
      </ListItem>
    );
  }

  return <></>;
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  nameText: {
    fontFamily: "genju-medium"
  },
  idText: {
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: COLOR.inactiveColor,
    textDecorationLine: "underline"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});

export default FollowElement;
