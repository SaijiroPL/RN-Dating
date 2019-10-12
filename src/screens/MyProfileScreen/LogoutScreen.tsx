import React from "react";
import { View, Text } from "react-native";

import { useNavigation } from "react-navigation-hooks";
import { CompleteButton } from "app/src/components/Button";
import appStyle from "app/src/styles/GeneralStyle";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * ログアウト確認画面
 * @author itsukiyamada
 */
const LogoutScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("appTop");
  };

  return (
    <View style={appStyle.standardContainer}>
      <View style={{ marginBottom: 10 }}>
        <Text style={appTextStyle.defaultText}>本当にログアウトしますか？</Text>
      </View>
      <CompleteButton title="ログアウトする" onPress={onCompleteButtonPress} />
    </View>
  );
};

export default LogoutScreen;
