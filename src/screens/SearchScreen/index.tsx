import React from "react";
import { Text, View } from "react-native";

// from app
import styles from "./styles";

/**
 * 検索画面トップ
 */
export default class SearchScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text>検索画面</Text>
      </View>
    );
  }
}
