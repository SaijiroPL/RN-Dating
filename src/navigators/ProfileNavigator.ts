import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import ProfileTopScreen from "app/src/screens/ProfileScreen/ProfileTopScreen";
import FollowScreen from "app/src/screens/ProfileScreen/FollowScreen";
import FollowerScreen from "app/src/screens/ProfileScreen/FollowerScreen";
import appStyle from "app/src/styles/common-style";
import SettingNavigator from "./SettingNavigator";

/**
 * プロフィールタブのナビゲーター
 * @author kotatanaka
 */
const ProfileNavigator = createStackNavigator(
  {
    // プロフィール画面トップ
    top: {
      screen: ProfileTopScreen,
      navigationOptions: () => ({
        headerTitle: "プロフィール",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // 設定画面
    setting: {
      screen: SettingNavigator,
      navigationOptions: () => ({
        headerTitle: "設定",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // フォロー一覧画面
    follow: {
      screen: FollowScreen,
      navigationOptions: () => ({
        headerTitle: "フォロー",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // フォロワー一覧画面
    follower: {
      screen: FollowerScreen,
      navigationOptions: () => ({
        headerTitle: "フォロワー",
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(ProfileNavigator);
