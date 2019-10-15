import React from "react";
import { Text } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { FollowList } from "app/src/components/List";
import { useGetFollowList } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * フォローリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  /** 対象のユーザーID */
  const userId = useNavigationParam("id");

  /** フォローリスト取得 */
  const { isLoading, follows } = useGetFollowList(userId);

  /** ローディング */
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>フォロー数: {follows.total}</Text>
      <FollowList follows={follows.follow_list} />
    </Container>
  );
};

export default FollowScreen;
