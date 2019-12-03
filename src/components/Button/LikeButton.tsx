import React, { useCallback } from "react";
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

  // お気に入り登録,解除機能を持たせないボタン
  if (!onLike || !onUnlike || !reload) {
    return (
      <View style={thisStyle.container}>
        {liked ? (
          <AntDesign name="heart" size={20} style={thisStyle.button} />
        ) : (
          <AntDesign name="hearto" size={20} style={thisStyle.button} />
        )}
        <Text style={appTextStyle.tintColorText}>{likeCount}</Text>
      </View>
    );
  }

  /** お気に入り登録 */
  const handleLike = useCallback(async () => {
    const result = await onLike();
    if (result) {
      reload();
    }
  }, []);

  /** お気に入り解除 */
  const handleUnlike = useCallback(async () => {
    const result = await onUnlike();
    if (result) {
      reload();
    }
  }, []);

  return (
    <View style={thisStyle.container}>
      {liked ? (
        <AntDesign
          name="heart"
          size={20}
          style={thisStyle.button}
          onPress={handleUnlike}
        />
      ) : (
        <AntDesign
          name="hearto"
          size={20}
          style={thisStyle.button}
          onPress={handleLike}
        />
      )}
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
