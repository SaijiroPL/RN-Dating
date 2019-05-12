import React from 'react';
import { Text, View } from 'react-native';

// from app
import styles from './styles';

/**
 * 初回起動時の画面
 */
export default class TopScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>初期画面</Text>
      </View>
    );
  }
}
