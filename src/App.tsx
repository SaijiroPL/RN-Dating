import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { AppLoading, Asset, Font } from "expo";

// from app
import { Provider } from "app/src/Store";
import AppNavigator from "app/src/navigators/AppNavigator";
import Images from "app/src/constants/Images";
import Fonts from "app/src/constants/Fonts";
import appStyle from "app/src/styles/common-style";

interface Props {
  skipLoadingScreen: boolean;
}

interface State {
  isLoadingComplete: boolean;
}

/**
 * アプリケーション初期化コンポーネント
 * @author kotatanaka
 */
export default class App extends React.Component<Props, State> {
  static defaultProps: Props = {
    skipLoadingScreen: false
  };

  public state: State = {
    isLoadingComplete: false
  };

  /** ローカルリソースの読み込み */
  loadResourcesAsync: any = async () => {
    await Asset.loadAsync(Object.keys(Images).map(key => Images[key]));
    await Font.loadAsync(Fonts);
    return true;
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    // リソースの読み込みが終わるまでローディング
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
      <Provider>
        <View style={appStyle.defaultContainer}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
