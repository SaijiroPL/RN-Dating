import React, { useCallback } from 'react';
import { Fab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

// from app
import { COLOR } from 'app/src/constants';

/** スポット作成フローティングボタン */
export const CreateSpotFab: React.FC = () => {
  const { navigate } = useNavigation();

  /** スポット作成トップに遷移 */
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
      <FontAwesome5 name="map-marker" size={24} color={COLOR.greyColor} />
    </Fab>
  );
};
