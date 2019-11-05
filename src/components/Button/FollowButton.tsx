import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View } from "native-base";
// import { AntDesign } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  followed: boolean;
  onFollow: () => Promise<boolean>;
  onUnfollow: () => Promise<boolean>;
  reload: () => Promise<void>;
}

/**
 * フォローボタン
 * @author kotatanaka
 */
export const FollowButton: React.FC<Props> = (props: Props) => {
  const { followed, onFollow, onUnfollow, reload } = props;

  const renderFollowButton = () => {
    // アンフォローボタン(フォロー済み状態)
    if (followed) {
      return (
        <Button
          small
          rounded
          color={"white"}
          style={thisStyle.unfollowButton}
          onPress={() =>
            onUnfollow().then(success => {
              if (success) {
                reload();
              }
            })
          }
        >
          <Text style={appTextStyle.standardWhiteText}>フォロー中</Text>
        </Button>
      );
    }

    // フォローボタン(未フォロー状態)
    return (
      <Button
        small
        rounded
        light
        color={COLOR.textTintColor}
        onPress={() =>
          onFollow().then(success => {
            if (success) {
              reload();
            }
          })
        }
      >
        {/* <AntDesign
          name="pluscircleo"
          size={15}
          style={{ color: COLOR.tintColor, marginLeft: 15 }}
        /> */}
        <Text style={appTextStyle.standardLightText}>＋ フォロー</Text>
      </Button>
    );
  };

  return renderFollowButton();
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  unfollowButton: {
    backgroundColor: COLOR.tintColor
  }
});
