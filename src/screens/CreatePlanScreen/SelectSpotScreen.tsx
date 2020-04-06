import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';

/**
 * デートスポット厳選画面
 * @author kotatanaka
 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('arrange');
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
