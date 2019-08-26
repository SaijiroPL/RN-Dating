import React from "react";
import { View, Text } from "react-native";

import { useNavigation } from "react-navigation-hooks";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import appStyle from "app/src/styles/general-style";

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
    <View style={appStyle.standardContainer}>
      <Text>本当にログアウトしますか？</Text>
      <CompleteButton title="ログアウトする" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default LogoutScreen;
