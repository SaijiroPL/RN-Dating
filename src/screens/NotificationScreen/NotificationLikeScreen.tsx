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
 * お気に入り通知一覧画面
 */
export default class NotificationLikeScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text style={appStyle.defaultText}>お気に入り通知はありません。</Text>
      </View>
    );
  }
}
