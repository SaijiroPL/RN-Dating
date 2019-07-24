import React, { FC } from "react";
import { Fab } from "native-base";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// from app
import { homeStyle } from "app/src/styles/home-screen-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * プラン作成フローティングボタン
 * @author kotatanaka
 */
const CreatePlanFab: FC<Props> = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate("create");
  };

  return (
    <Fab
      active={true}
      containerStyle={{}}
      style={homeStyle.createPlanFab}
      position="bottomRight"
      onPress={onPress}
    >
      <MaterialCommunityIcons name="map-marker-plus" />
    </Fab>
  );
};

export default CreatePlanFab;
