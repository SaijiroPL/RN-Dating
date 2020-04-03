import React, { useState, useCallback } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

// from app
import { Provider } from 'app/src/Store';
import { IMAGE, FONT } from 'app/src/constants';
import AppNavigator from 'app/src/navigators/AppNavigator';
import { appStyle } from 'app/src/styles';

interface Props {
  skipLoadingScreen: boolean;
}

/**
 * アプリケーションの初期化
 * @author kotatanaka
 */
const App: React.FC<Props> = (props: Props) => {
  /** ローディング状態 */
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  /** ローカルリソースの読み込み */
  const loadResourcesAsync = useCallback(async (): Promise<void> => {
    await Asset.loadAsync(Object.keys(IMAGE).map((key) => IMAGE[key]));
    await Font.loadAsync(FONT);
  }, []);

  /** ローディングエラー時の処理 */
  const handleLoadingError = useCallback((error) => {
    console.warn(error);
  }, []);

  /** ローディング成功時の処理 */
  const handleLoadingComplete = useCallback(() => {
    setLoadingComplete(true);
  }, []);

  // リソースの読み込みが終わるまでローディング
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleLoadingComplete}
      />
    );
  }

  return (
    <Provider>
      <View style={appStyle.appContainer}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
};

App.defaultProps = {
  skipLoadingScreen: false,
};

export default App;
