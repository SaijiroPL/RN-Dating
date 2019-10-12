import React, { useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";

// from app
import { Provider } from "app/src/Store";
import { IMAGE, FONT } from "app/src/constants";
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
    await Asset.loadAsync(Object.keys(IMAGE).map(key => IMAGE[key]));
    await Font.loadAsync(FONT);
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
