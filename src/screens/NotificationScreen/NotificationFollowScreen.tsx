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
 * フォロー通知一覧画面
 */
export default class NotificationFollowScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text style={appStyle.defaultText}>フォロー通知はありません。</Text>
      </View>
    );
  }
}
