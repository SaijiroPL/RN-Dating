import React from "react";
import { Text, View } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

// from app
import appStyle from "app/src/styles/common-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * マイプラン画面トップ
 */
export default class MyPlanTopScreen extends React.Component<Props> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>マイプラン画面</Text>
      </View>
    );
  }
}
