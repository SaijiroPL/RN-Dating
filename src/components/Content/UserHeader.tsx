import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { IUserInfo } from "app/src/interfaces/User";
import Images from "app/src/constants/Images";

interface Props {
  user: IUserInfo;
}

/**
 * ユーザーヘッダーコンポーネント
 * @author kotatanaka
 */
export const UserHeader: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user } = props;

  const onPress = () => {
    navigate("profile", { id: user.userId });
  };

  return (
    <View style={thisStyle.container}>
      <View style={thisStyle.thumbnail}>
        <Thumbnail source={Images.noUserImage} />
      </View>
      <View style={thisStyle.user}>
        <Text style={thisStyle.nameText} onPress={onPress}>
          {user.userName}
        </Text>
        <Text note style={thisStyle.attrText}>
          {user.userAttr}
        </Text>
      </View>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    margin: 5
  },
  thumbnail: {
    padding: 5
  },
  user: {
    padding: 5
  },
  nameText: {
    fontFamily: "genju-medium"
  },
  attrText: {
    fontFamily: "genju-light"
  }
});
