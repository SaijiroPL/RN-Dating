import React, { useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";

// from app
import { Provider } from "app/src/Store";
import Images from "app/src/constants/Images";
import Fonts from "app/src/constants/Fonts";
import AppNavigator from "app/src/navigators/AppNavigator";
import appStyle from "app/src/styles/GeneralStyle";

interface Props {
  skipLoadingScreen: boolean;
}

/**
 * アプリケーションの初期化
 * @author kotatanaka
 */
const App: React.FC<Props> = (props: Props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  /** ローカルリソースの読み込み */
  const loadResourcesAsync = async () => {
    await Asset.loadAsync(Object.keys(Images).map(key => Images[key]));
    await Font.loadAsync(Fonts);
  };

  // リソースの読み込みが終わるまでローディング
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={error => console.warn(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  }

  return (
    <Provider>
      <View style={appStyle.appContainer}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
};

App.defaultProps = {
  skipLoadingScreen: false
};

export default App;
