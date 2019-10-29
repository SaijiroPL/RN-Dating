import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SettingTopScreen from "app/src/screens/SettingScreen/SettingTopScreen";
import ChangePasswordScreen from "app/src/screens/SettingScreen/ChangePasswordScreen";
import DeleteHistoryScreen from "app/src/screens/SettingScreen/DeleteHistoryScreen";
import EditProfileScreen from "app/src/screens/SettingScreen/EditProfileScreen";
import FaqScreen from "app/src/screens/SettingScreen/FaqScreen";
import LinkedAccountScreen from "app/src/screens/SettingScreen/LinkedAccountScreen";
import LogoutScreen from "app/src/screens/SettingScreen/LogoutScreen";
import PrivacyPolicyScreen from "app/src/screens/TopScreen/PrivacyPolicyScreen";
import TermsScreen from "app/src/screens/TopScreen/TermsScreen";
import { appTextStyle } from "app/src/styles";

/**
 * 設定画面のナビゲーター
 * @author kotatanaka
 */
const SettingNavigator = createStackNavigator(
  {
    // 設定画面トップ
    top: {
      screen: SettingTopScreen,
      navigationOptions: () => ({
        headerTitle: "設定",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    pass: {
      screen: ChangePasswordScreen,
      navigationOptions: () => ({
        headerTitle: "パスワード変更",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    history: {
      screen: DeleteHistoryScreen,
      navigationOptions: () => ({
        headerTitle: "検索履歴の削除",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    profile: {
      screen: EditProfileScreen,
      navigationOptions: () => ({
        headerTitle: "プロフィール設定",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    faq: {
      screen: FaqScreen,
      navigationOptions: () => ({
        headerTitle: "ヘルプセンター",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    account: {
      screen: LinkedAccountScreen,
      navigationOptions: () => ({
        headerTitle: "リンク済みアカウント",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    logout: {
      screen: LogoutScreen,
      navigationOptions: () => ({
        headerTitle: "ログアウト",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    privacy: {
      screen: PrivacyPolicyScreen,
      navigationOptions: () => ({
        headerTitle: "プライバシーポリシー",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    terms: {
      screen: TermsScreen,
      navigationOptions: () => ({
        headerTitle: "利用規約",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(SettingNavigator);
