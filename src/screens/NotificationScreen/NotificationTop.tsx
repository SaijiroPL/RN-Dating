import * as React from "react";
import { Text, View } from "react-native";

// from app
import appStyle from "app/src/styles/common-style";

/**
 * 通知画面トップ
 */
export default class NotificationTopScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={appStyle.defaultContainer}>
        <Text>通知画面</Text>
      </View>
    );
  }
}
