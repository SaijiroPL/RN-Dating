import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

// Navigator
import AppNavigator from 'app/src/navigation/AppNavigator';

// from app
import images from 'app/src/images';
import fonts from 'app/src/fonts';

export default class App extends React.Component {
  static defaultProps = {
    skipLoadingScreen: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  /** ローカルリソースの読み込み */
  loadResourcesAsync = async () => {
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);
    return true;
  }
  //test

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    // リソースの読み込みが終わるまではAppLoadingをrenderする
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
