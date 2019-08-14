import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { createPlanStyle } from "app/src/styles/home-screen-style";

/**
 * デートスポット順番並べ替え画面
 */
const ArrangeRouteScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("complete");
  };

  return (
    <View style={createPlanStyle.container}>
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default ArrangeRouteScreen;
