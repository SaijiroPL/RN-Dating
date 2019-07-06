import React from "react";
import { Text, View } from "react-native";

// from app
import { appStyle } from "app/src/styles/common-style";

/**
 * 検索画面トップ
 */
export default class SearchScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>検索画面</Text>
      </View>
    );
  }
}
