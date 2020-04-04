import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
// import { AntDesign } from "@expo/vector-icons";

// from app
import { COLOR } from 'app/src/constants';
import { appTextStyle } from 'app/src/styles';

interface Props {
  targetUserId: string;
  followed: boolean;
  onFollow: (id: string) => Promise<boolean>;
  onUnfollow: (id: string) => Promise<boolean>;
  reload: () => Promise<void>;
}

/**
 * フォローボタン
 * @author kotatanaka
 */
export const FollowButton: React.FC<Props> = (props: Props) => {
  const { targetUserId, followed, onFollow, onUnfollow, reload } = props;

  /** フォロー */
  const follow = useCallback(async (): Promise<void> => {
    const result = await onFollow(targetUserId);
    if (result) {
      reload();
    }
  }, [targetUserId]);

  /** アンフォロー */
  const unfollow = useCallback(async (): Promise<void> => {
    const result = await onUnfollow(targetUserId);
    if (result) {
      reload();
    }
  }, [targetUserId]);

  // アンフォローボタン(フォロー済み状態)
  if (followed) {
    return (
      <Button
        small
        rounded
        color="white"
        style={thisStyle.unfollowButton}
        onPress={unfollow}
      >
        <Text style={appTextStyle.standardWhiteText}>フォロー中</Text>
      </Button>
    );
  }

  // フォローボタン(未フォロー状態)
  return (
    <Button small rounded light color={COLOR.textTintColor} onPress={follow}>
      {/* <AntDesign
        name="pluscircleo"
        size={15}
        style={{ color: COLOR.tintColor, marginLeft: 15 }}
      /> */}
      <Text style={appTextStyle.standardLightText}>＋ フォロー</Text>
    </Button>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  unfollowButton: {
    backgroundColor: COLOR.tintColor,
  },
});
