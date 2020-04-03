import React from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import { Container, Text } from 'native-base';

// from app
import { LoadingSpinner } from 'app/src/components/Spinners';
import { CommentList } from 'app/src/components/List';
import { useGetCommentList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/**
 * コメント一覧画面
 * @author kotatanaka
 */
const CommentScreen: React.FC = () => {
  /** デートプランID */
  const planId = useNavigationParam('id');

  /** コメント一覧取得 */
  const { isCommentsLoading, comments } = useGetCommentList(planId);

  // ローディング
  if (isCommentsLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>{comments.total} 件のコメント</Text>
      <CommentList commentList={comments.comment_list} />
    </Container>
  );
};

export default CommentScreen;
