import React from "react";
import { Text, View } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

// from app
import { homeStyle } from "app/src/styles/home-screen-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

/**
 * プラン作成画面トップ
 */
export default class CreatePlanTopScreen extends React.Component<Props> {
  render() {
    return (
      <View style={homeStyle.container}>
        <Text>プラン作成</Text>
      </View>
    );
  }
}
