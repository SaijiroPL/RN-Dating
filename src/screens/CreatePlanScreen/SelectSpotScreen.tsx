import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { createImportSpecifier } from 'typescript';

/** デートスポット厳選画面 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = useCallback(() => {
    navigate('Arrange');
  }, []);
  const createRealSpots = useGlobalState('createRealSpots');
  const createPlan = useGlobalState('createPlan');

  return (
    <Container>
      <ImageGrid realSpots={createRealSpots} />
      <CompleteFooterButton
        title="次へ"
        realSpots={createRealSpots}
        plan={createPlan}
        onPress={onCompleteButtonPress}
      />
    </Container>
  );
};

export default SelectSpotScreen;
