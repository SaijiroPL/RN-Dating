import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { homeStyle } from "app/src/styles/home-screen-style";

/**
 * デートスポット厳選画面
 */
const SelectSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("arrange");
  };

  return (
    <View style={homeStyle.createPlanContainer}>
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default SelectSpotScreen;
