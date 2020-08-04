import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';

/** デートスポット厳選画面 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Arrange');
  }, []);

  return (
    <Container>
      <Content>
        <ImageGrid />
      </Content>
      <CompleteFooterButton title="次へ" onPress={onCompleteButtonPress} />
    </Container>
  );
};

export default SelectSpotScreen;
