import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * ホーム画面トップ
 */
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ホーム画面</Text>
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

export default HomeScreen ;