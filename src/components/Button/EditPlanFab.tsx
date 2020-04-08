import React, { useCallback } from 'react';
import { Fab } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// from app
import { COLOR } from 'app/src/constants';

/**
 * プラン編集フローティングボタン
 * @author kotatanaka
 */
export const EditPlanFab: React.FC = () => {
  const { navigate } = useNavigation();

  /** プラン編集画面に遷移 */
  const toCreate = useCallback(() => {
    navigate('EditPlan');
  }, []);

  return (
    <Fab
      active
      containerStyle={{}}
      style={{ backgroundColor: COLOR.tintColor }}
      position="bottomRight"
      onPress={toCreate}
    >
      <AntDesign name="edit" />
    </Fab>
  );
};
