import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 通知画面トップ
 */
class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>通知画面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default NotificationScreen;