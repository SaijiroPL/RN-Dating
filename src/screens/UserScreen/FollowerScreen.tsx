import React from "react";
import { Text } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { FollowList } from "app/src/components/List";
import { useGetFollowerList, useFollowUser } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * フォロワーリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** フォロワーリスト取得 */
  const { isLoading, followers, getFollowerList } = useGetFollowerList(userId);

  /** フォロー・フォロー解除 */
  const { follow, unfollow } = useFollowUser(userId);

  /** ローディング */
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>
        フォロワー数: {followers.total}
      </Text>
      <FollowList
        followers={followers.follower_list}
        onFollow={follow}
        onUnfollow={unfollow}
        reload={getFollowerList}
      />
    </Container>
  );
};

export default FollowScreen;
