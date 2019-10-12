import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
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
export const LikeButton: React.FC<Props> = (props: Props) => {
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
    color: COLOR.tintColor,
    marginRight: 5
  }
});
