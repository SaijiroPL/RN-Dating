import React, { useState, useCallback } from 'react';
import { Platform, StatusBar, View, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// from app
import { Provider } from 'app/src/Store';
import { IMAGE, FONT } from 'app/src/constants';
import AppNavigator from 'app/src/navigators/AppNavigator';
import { appStyle } from 'app/src/styles';

interface Props {
  skipLoadingScreen?: boolean;
}

/** 警告を表示しない設定 */
YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;

/** アプリケーションの初期化 */
const App: React.FC<Props> = (props: Props) => {
  const { skipLoadingScreen } = props;

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
  if (!isLoadingComplete && !skipLoadingScreen) {
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
        <ActionSheetProvider>
          <AppNavigator />
        </ActionSheetProvider>
      </View>
    </Provider>
  );
};

App.defaultProps = {
  skipLoadingScreen: false,
};

const ConnectedApp = connectActionSheet(App);

export default class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    );
  }
}
