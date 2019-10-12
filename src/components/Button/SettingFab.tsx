import React from "react";
import { Fab } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";

/**
 * 設定フローティングボタン
 * @author kotatanaka
 */
export const SettingFab: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Fab
      active={true}
      containerStyle={{}}
      style={{ backgroundColor: COLOR.tintColor }}
      position="bottomRight"
      onPress={() => navigate("setting")}
    >
      <MaterialCommunityIcons name="settings" />
    </Fab>
  );
};
