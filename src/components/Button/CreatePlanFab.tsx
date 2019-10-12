import React from "react";
import { Fab } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// from app
import Colors from "app/src/constants/Colors";

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
      style={{ backgroundColor: Colors.tintColor }}
      position="bottomRight"
      onPress={() => navigate("create")}
    >
      <MaterialCommunityIcons name="map-marker-plus" />
    </Fab>
  );
};

export default CreatePlanFab;
