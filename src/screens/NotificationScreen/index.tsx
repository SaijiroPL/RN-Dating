import React from 'react';
import { Text, View } from 'react-native';

// from app
import styles from './styles';

/**
 * 通知画面トップ
 */
export default class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>通知画面</Text>
      </View>
    );
  }
}
