import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MainTabNavigator from "app/src/navigation/MainTabNavigator";
import Top from "app/src/screens/TopScreen/Top";
import Entry from "app/src/screens/TopScreen/Entry";
import Welcome from "app/src/screens/TopScreen/Welcome";

/**
 * アプリケーション全体のナビゲーター
 * @author kotatanaka
 */
const AppNavigator = createStackNavigator({
  // トップ画面
  top: { screen: Top },
  // ウェルカム画面
  welcome: { screen: Welcome },
  // 基本情報入力画面
  entry: { screen: Entry },
  // メイン画面
  main: { screen: MainTabNavigator }
});

export default createAppContainer(AppNavigator);
