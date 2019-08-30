import React from "react";
import { View, Text } from "react-native";

import { useNavigation } from "react-navigation-hooks";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { createPlanStyle } from "app/src/styles/home-screen-style";

/**
 * ログアウトボタンの実装
 * @author itsukiyamada
 */
const LogoutScreen: React.FC = () => {
  const { navigate } = useNavigation();

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
