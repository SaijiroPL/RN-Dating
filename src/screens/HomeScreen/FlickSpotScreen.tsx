import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { homeStyle } from "app/src/styles/home-screen-style";

/**
 * デートスポット候補フリック画面
 */
const FlickSpotScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("select");
  };

  return (
    <View style={homeStyle.createPlanContainer}>
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default FlickSpotScreen;
