import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Provider } from "react-redux";
// import axiosBase from 'axios';

// from app
import Images from "app/src/constants/Images";
import Fonts from "app/src/constants/Fonts";
import store from "app/src/redux/store";
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
    await Asset.loadAsync(Object.keys(Images).map(key => Images[key]));
    await Font.loadAsync(Fonts);
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
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
      >
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}
