import React from 'react';
import { Text, View } from 'react-native';

// from app
import styles from './styles';

/**
 * ホーム画面トップ
 */
export default class HomeScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text>ホーム画面</Text>
      </View>
    );
  }
}
