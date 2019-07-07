import * as React from "react";
import { Text, View } from "react-native";

// from app
import appStyle from "app/src/styles/common-style";

/**
 * プロフィール画面トップ
 */
export default class ProfileTopScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>設定画面</Text>
      </View>
    );
  }
}
