import React from "react";
import { View } from "react-native";

import CompleteButton from "app/src/components/buttons/CompleteButton";


const LogoutScreen: React.FC = () => {

  const onCompleteButtonPress = () => {
    navigate("complete");
  };

  return (
    <View style={createPlanStyle.container}>
      <Text>本当にログアウトしますか？</Text>
      <CompleteButton title="ログアウトする" onPress={onCompleteButtonPress} />
    </View>
  );
  };

export default LogoutScreen;
