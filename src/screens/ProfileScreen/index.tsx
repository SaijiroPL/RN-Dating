import React from "react";
import { Text, View } from "react-native";

// from app
import styles from "./styles";

/**
 * プロフィール画面トップ
 */
export default class ProfileScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text>設定画面</Text>
      </View>
    );
  }
}
