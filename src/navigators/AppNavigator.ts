import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MainTabNavigator from "app/src/navigators/MainTabNavigator";
import TopScreen from "app/src/screens/TopScreen/Top";
import WelcomeScreen from "app/src/screens/TopScreen/Welcome";
import EntryScreen from "app/src/screens/TopScreen/Entry";

/**
 * アプリケーション全体のナビゲーター
 * @author kotatanaka
 */
const AppNavigator = createStackNavigator(
  {
    // トップ画面
    top: { screen: TopScreen },
    // ウェルカム画面
    welcome: { screen: WelcomeScreen },
    // 基本情報入力画面
    entry: { screen: EntryScreen },
    // メイン画面
    main: { screen: MainTabNavigator }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
