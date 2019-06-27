import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
// import axiosBase from 'axios';

// from app
import Navigation from ".";
import Images from "./constants/Images";
import Fonts from "./constants/Fonts";

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
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
