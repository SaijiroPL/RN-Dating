import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Provider } from "react-redux";
// import axiosBase from 'axios';

// from app
import images from "app/src/constants/images";
import fonts from "app/src/constants/fonts";
import appStyle from "app/src/styles/common-style";
import store from "app/src/store";
import AppWithNavigationState from "app/src/navigation/RootNavigation";

// const userApiBaseUrl = `${process.env.ONEDATE_SERVER_URL}/user`;
// const axios = axiosBase.create({ baseURL: userApiBaseUrl });

interface Props {
  skipLoadingScreen: boolean;
}

interface State {
  isLoadingComplete: boolean;
}

export default class App extends React.Component<Props, State> {
  static defaultProps: Props = {
    skipLoadingScreen: false
  };

  public state: State = {
    isLoadingComplete: false
  };

  /** ローカルリソースの読み込み */
  loadResourcesAsync: any = async () => {
    await Asset.loadAsync(Object.keys(images).map(key => images[key]));
    await Font.loadAsync(fonts);
    return true;
  };

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
      <View style={appStyle.defaultContainer}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}
