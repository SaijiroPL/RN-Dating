import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { IFollow } from "app/src/interfaces/api/Follow";
import Colors from "app/src/constants/Colors";
import Images from "app/src/constants/Images";

interface Props {
  follow: IFollow;
}

/**
 * フォロー/フォロワーリスト要素コンポーネント
 * @author kotatanaka
 */
export const FollowElement: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { follow } = props;

  const onPress = () => {
    navigate("profile", { id: follow.user_id });
  };

  return (
    <ListItem avatar onPress={onPress} style={thisStyle.container}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
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
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});

export default FollowElement;
