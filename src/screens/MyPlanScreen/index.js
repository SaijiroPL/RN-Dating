import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * マイプラン画面トップ
 */
class MyPlanScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>マイプラン画面</Text>
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

export default MyPlanScreen;
