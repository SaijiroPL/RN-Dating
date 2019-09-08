import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";

// from app
import CompleteButton from "app/src/components/buttons/CompleteButton";
import appStyle from "app/src/styles/GeneralStyle";

/**
 * デートプラン作成完了画面
 */
const CompletePlanScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("top");
  };

  return (
    <View style={appStyle.standardContainer}>
      <CompleteButton title="決定" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default CompletePlanScreen;
