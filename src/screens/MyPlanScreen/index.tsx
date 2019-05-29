import React from 'react';
import { Text, View } from 'react-native';

// from app
import styles from './styles';

/**
 * マイプラン画面トップ
 */
export default class MyPlanScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>マイプラン画面</Text>
      </View>
    );
  }
}
