import React, { useCallback } from 'react';
import { Container, Content } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

// from app
import { CompleteFooterButton } from 'app/src/components/Button';

/**
 * デートスポット順番並べ替え画面
 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('complete');
  }, []);

  return (
    <Container>
      <Content />
      <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
    </Container>
  );
};

export default ArrangeRouteScreen;
