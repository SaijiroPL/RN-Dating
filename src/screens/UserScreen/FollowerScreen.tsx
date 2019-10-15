import React from "react";
import { Text } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { FollowList } from "app/src/components/List";
import { useGetFollowerList } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * フォロワーリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** フォロワーリスト取得 */
  const { isLoading, followers } = useGetFollowerList(userId);

  /** ローディング */
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>
        フォロワー数: {followers.total}
      </Text>
      <FollowList follows={followers.follower_list} />
    </Container>
  );
};

export default FollowScreen;
