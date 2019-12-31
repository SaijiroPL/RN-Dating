import React from "react";
import { Text } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { FollowList } from "app/src/components/List";
import { useGetFollowList, useFollowUser } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * フォローリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** フォローリスト取得 */
  const { isLoading, follows, getFollowList } = useGetFollowList(userId);

  /** フォロー・フォロー解除 */
  const { follow, unfollow } = useFollowUser(loginUser.id);

  /** ローディング */
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>フォロー数: {follows.total}</Text>
      <FollowList
        follows={follows.follow_list}
        onFollow={follow}
        onUnfollow={unfollow}
        reload={getFollowList}
      />
    </Container>
  );
};

export default FollowScreen;
