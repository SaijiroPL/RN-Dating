import React, { useCallback } from 'react';
import { Fab } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// from app
import { COLOR } from 'app/src/constants';

/**
 * プラン作成フローティングボタン
 * @author itsukiyamada
 */
export const CreateSpotFab: React.FC = () => {
  const { navigate } = useNavigation();

  /** プラン作成トップに遷移 */
  const toCreate = useCallback(() => {
    navigate('CreateSpot');
  }, []);

  return (
    <Fab
      active
      containerStyle={{}}
      style={{ backgroundColor: COLOR.tintColor }}
      position="bottomRight"
      onPress={toCreate}
    >
      <MaterialCommunityIcons name="plus" />
    </Fab>
  );
};
