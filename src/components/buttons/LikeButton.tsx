import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// from app
import { appButtonStyle, appTextStyle } from "app/src/styles/general-style";

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
          style={appButtonStyle.likeButton}
          onPress={() => props.setLiked(false)}
        />
      );
    }

    return (
      <AntDesign
        name="hearto"
        size={20}
        style={appButtonStyle.likeButton}
        onPress={() => props.setLiked(true)}
      />
    );
  };

  return (
    <View style={appButtonStyle.likeButtonContainer}>
      {renderHeart()}
      <Text style={appTextStyle.colorText}>{props.likeCount}</Text>
    </View>
  );
};

export default LikeButton;
