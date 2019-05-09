import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * プロフィール画面トップ
 */
class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>設定画面</Text>
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

export default ProfileScreen;
