import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// from app
import TopNavigator from 'app/src/navigators/TopNavigator';
import MainTabNavigator from 'app/src/navigators/MainTabNavigator';
import WelcomeScreen from 'app/src/screens/TopScreen/WelcomeScreen';
import EntryScreen from 'app/src/screens/TopScreen/EntryScreen';

/** アプリケーション全体のナビゲーター */
const AppNavigator = createSwitchNavigator({
  // アプリトップ画面
  appTop: { screen: TopNavigator },
  // ウェルカム画面
  welcome: { screen: WelcomeScreen },
  // 基本情報入力画面
  entry: { screen: EntryScreen },
  // メイン画面
  main: { screen: MainTabNavigator },
});

export default createAppContainer(AppNavigator);
