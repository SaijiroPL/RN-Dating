import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Content } from 'native-base';

// from app
import { ImageGrid } from 'app/src/components/List';
import { CompleteFooterButton } from 'app/src/components/Button';
import { useDispatch, useGlobalState } from 'app/src/Store';
import { createImportSpecifier } from 'typescript';
import { ActionType } from 'app/src/Reducer';

/** デートスポット厳選画面 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const onCompleteButtonPress = useCallback(() => {
    let total = [];
    for (let i = 0; i < createRealSpots.total.length; i++) {
      if (createRealSpots.total[i].check) {
        total.push(createRealSpots.total[i]);
      }
    }
    if (total.length) {
      dispatch({
        type: ActionType.SET_CREATE_REAL_SPOTS,
        payload: {
          total,
        },
      });
      navigate('Arrange');
    } else {
      alert('No Place!');
    }
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
