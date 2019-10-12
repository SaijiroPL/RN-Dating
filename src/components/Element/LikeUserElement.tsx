import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { ILikeUser } from "app/src/interfaces/api/Like";
import Colors from "app/src/constants/Colors";
import Images from "app/src/constants/Images";

interface Props {
  user: ILikeUser;
}

/**
 * デートプランお気に入り登録者リスト要素コンポーネント
 * @author kotatanaka
 */
export const LikeUserElement: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user } = props;

  const onPress = () => {
    navigate("profile", { id: user.user_id });
  };

  return (
    <ListItem avatar onPress={onPress} style={thisStyle.container}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text style={thisStyle.nameText}>{user.user_name}</Text>
        <Text style={thisStyle.idText}>@{user.user_id}</Text>
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

export default LikeUserElement;
