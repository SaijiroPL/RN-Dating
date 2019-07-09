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
 * 検索画面トップ
 */
export default class SearchTopScreen extends React.Component<Props> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>検索画面</Text>
      </View>
    );
  }
}
