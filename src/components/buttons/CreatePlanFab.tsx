import React from "react";
import { Fab } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// from app
import { homeStyle } from "app/src/styles/home-screen-style";

/**
 * プラン作成フローティングボタン
 * @author kotatanaka
 */
const CreatePlanFab: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Fab
      active={true}
      containerStyle={{}}
      style={homeStyle.createPlanFab}
      position="bottomRight"
      onPress={() => navigate("create")}
    >
      <MaterialCommunityIcons name="map-marker-plus" />
    </Fab>
  );
};

export default CreatePlanFab;
