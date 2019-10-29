import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MainTabNavigator from "app/src/navigators/MainTabNavigator";
import AppTopScreen from "app/src/screens/TopScreen/AppTopScreen";
import TermsScreen from "app/src/screens/TopScreen/TermsScreen";
import PrivacyPolycyScreen from "app/src/screens/TopScreen/PrivacyPolicyScreen";
import WelcomeScreen from "app/src/screens/TopScreen/WelcomeScreen";
import EntryScreen from "app/src/screens/TopScreen/EntryScreen";
import { appTextStyle } from "app/src/styles";

/**
 * アプリトップ画面のナビゲーター
 * @author kotatanaka
 */
const TopNavigator = createStackNavigator(
  {
    // トップ画面
    top: { screen: AppTopScreen },
    // 利用規約
    terms: {
      screen: TermsScreen,
      navigationOptions: () => ({
        headerTitle: "利用規約",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // プライバシーポリシー,
    privacy: {
      screen: PrivacyPolycyScreen,
      navigationOptions: () => ({
        headerTitle: "プライバシーポリシー",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

/**
 * アプリケーション全体のナビゲーター
 * @author kotatanaka
 */
const AppNavigator = createStackNavigator(
  {
    // アプリトップ画面
    appTop: { screen: TopNavigator },
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
