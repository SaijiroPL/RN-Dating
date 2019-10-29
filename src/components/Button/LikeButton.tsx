import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  likeCount: number;
  liked: boolean;
  onLike?: () => Promise<boolean>;
  onUnlike?: () => Promise<boolean>;
  reload?: () => Promise<void>;
}

/**
 * お気に入りボタン
 * @author kotatanaka
 */
export const LikeButton: React.FC<Props> = (props: Props) => {
  const { likeCount, liked, onLike, onUnlike, reload } = props;

  const renderHeart = () => {
    if (!onLike || !onUnlike || !reload) {
      if (liked) {
        return <AntDesign name="heart" size={20} style={thisStyle.button} />;
      }

      return <AntDesign name="hearto" size={20} style={thisStyle.button} />;
    }

    // お気に入り登録済ボタン(解除用)
    if (liked) {
      return (
        <AntDesign
          name="heart"
          size={20}
          style={thisStyle.button}
          onPress={() =>
            onUnlike().then(success => {
              if (success) {
                reload();
              }
            })
          }
        />
      );
    }

    // お気に入り未登録ボタン(登録用)
    return (
      <AntDesign
        name="hearto"
        size={20}
        style={thisStyle.button}
        onPress={() =>
          onLike().then(success => {
            if (success) {
              reload();
            }
          })
        }
      />
    );
  };

  return (
    <View style={thisStyle.container}>
      {renderHeart()}
      <Text style={appTextStyle.tintColorText}>{likeCount}</Text>
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
