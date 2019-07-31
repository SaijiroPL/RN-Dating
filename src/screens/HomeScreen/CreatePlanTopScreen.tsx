import React from "react";
import { Text, View } from "react-native";

// from app
import { homeStyle } from "app/src/styles/home-screen-style";

/**
 * プラン作成画面トップ
 */
const CreatePlanTopScreen: React.FC = () => {
  return (
    <View style={homeStyle.container}>
      <Text>プラン作成</Text>
    </View>
  );
};

export default CreatePlanTopScreen;
