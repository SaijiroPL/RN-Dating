import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// from app
import Colors from "app/src/constants/Colors";
import appTextStyle from "app/src/styles/GeneralTextStyle";

interface Props {
  likeCount: number;
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * お気に入りボタン
 * @author kotatanaka
 */
const LikeButton: React.FC<Props> = (props: Props) => {
  const renderHeart = () => {
    if (props.liked) {
      return (
        <AntDesign
          name="heart"
          size={20}
          style={thisStyle.button}
          onPress={() => props.setLiked(false)}
        />
      );
    }

    return (
      <AntDesign
        name="hearto"
        size={20}
        style={thisStyle.button}
        onPress={() => props.setLiked(true)}
      />
    );
  };

  return (
    <View style={thisStyle.container}>
      {renderHeart()}
      <Text style={appTextStyle.tintColorText}>{props.likeCount}</Text>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 30,
    justifyContent: "flex-end",
    marginRight: 10
  },
  button: {
    color: Colors.tintColor,
    marginRight: 5
  }
});

export default LikeButton;
