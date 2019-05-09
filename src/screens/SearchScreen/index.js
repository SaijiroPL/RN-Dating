import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 検索画面トップ
 */
class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>検索画面</Text>
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

export default SearchScreen;
