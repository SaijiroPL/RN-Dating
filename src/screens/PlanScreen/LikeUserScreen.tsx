import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import { Container, Text } from 'native-base';

// from app
import { LoadingSpinner } from 'app/src/components/Spinners';
import { LikeUserList } from 'app/src/components/List';
import { useGetLikeUserList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/**
 * デートプランお気に入り登録者一覧画面
 * @author kotatanaka
 */
const LikeUserScreen: React.FC = () => {
  const planId = useNavigationParam('id');

  /** デートプランお気に入り登録者一覧取得 */
  const { isLoading, users } = useGetLikeUserList(planId);

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>
        お気に入り登録者数: {users.total}
      </Text>
      <LikeUserList users={users.liked_user_list} />
    </Container>
  );
};

export default LikeUserScreen;
