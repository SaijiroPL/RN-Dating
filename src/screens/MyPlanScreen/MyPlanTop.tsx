import React from "react";
import { Text, View } from "react-native";

// from app
import appStyle from "app/src/styles/common-style";

/**
 * マイプラン画面トップ
 */
export default class MyPlanTopScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>マイプラン画面</Text>
      </View>
    );
  }
}
