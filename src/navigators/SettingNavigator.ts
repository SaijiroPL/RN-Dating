import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SettingTopScreen from "app/src/screens/MyProfileScreen/SettingTopScreen";
import ChangePasswordScreen from "app/src/screens/MyProfileScreen/ChangePasswordScreen";
import DeleteHistoryScreen from "app/src/screens/MyProfileScreen/DeleteHistoryScreen";
import EditProfileScreen from "app/src/screens/MyProfileScreen/EditProfileScreen";
import FaqScreen from "app/src/screens/MyProfileScreen/FaqScreen";
import LinkedAccountScreen from "app/src/screens/MyProfileScreen/LinkedAccountScreen";
import LogoutScreen from "app/src/screens/MyProfileScreen/LogoutScreen";
import PrivacypolicyScreen from "app/src/screens/MyProfileScreen/PrivacypolicyScreen";
import TermsScreen from "app/src/screens/MyProfileScreen/TermsScreen";
import appStyle from "app/src/styles/common-style";

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
        headerTitleStyle: appStyle.defaultText
      })
    },
    pass: {
      screen: ChangePasswordScreen,
      navigationOptions: () => ({
        headerTitle: "パスワード変更",
        headerTitleStyle: appStyle.defaultText
      })
    },
    history: {
      screen: DeleteHistoryScreen,
      navigationOptions: () => ({
        headerTitle: "検索履歴の削除",
        headerTitleStyle: appStyle.defaultText
      })
    },
    profile: {
      screen: EditProfileScreen,
      navigationOptions: () => ({
        headerTitle: "プロフィール設定",
        headerTitleStyle: appStyle.defaultText
      })
    },
    faq: {
      screen: FaqScreen,
      navigationOptions: () => ({
        headerTitle: "ヘルプセンター",
        headerTitleStyle: appStyle.defaultText
      })
    },
    account: {
      screen: LinkedAccountScreen,
      navigationOptions: () => ({
        headerTitle: "リンク済みアカウント",
        headerTitleStyle: appStyle.defaultText
      })
    },
    logout: {
      screen: LogoutScreen,
      navigationOptions: () => ({
        headerTitle: "ログアウト",
        headerTitleStyle: appStyle.defaultText
      })
    },
    privacy: {
      screen: PrivacypolicyScreen,
      navigationOptions: () => ({
        headerTitle: "プライバシーポリシー",
        headerTitleStyle: appStyle.defaultText
      })
    },
    terms: {
      screen: TermsScreen,
      navigationOptions: () => ({
        headerTitle: "利用規約",
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(SettingNavigator);
