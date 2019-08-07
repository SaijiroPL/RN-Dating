import React from "react";
import { Fab } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// from app
import { profileStyle } from "app/src/styles/profile-screen-style";

/**
 * 設定フローティングボタン
 * @author kotatanaka
 */
const SettingFab: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Fab
      active={true}
      containerStyle={{}}
      style={profileStyle.settingFab}
      position="bottomRight"
      onPress={() => navigate("setting")}
    >
      <MaterialCommunityIcons name="settings" />
    </Fab>
  );
};

export default SettingFab;
