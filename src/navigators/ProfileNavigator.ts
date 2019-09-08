import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyProfileTopScreen from "app/src/screens/MyProfileScreen/MyProfileTopScreen";
import FollowScreen from "app/src/screens/MyProfileScreen/FollowScreen";
import FollowerScreen from "app/src/screens/MyProfileScreen/FollowerScreen";
import ProfileScreen from "app/src/screens/DetailScreen/ProfileScreen";
import SettingNavigator from "./SettingNavigator";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * プロフィールタブのナビゲーター
 * @author kotatanaka
 */
const ProfileNavigator = createStackNavigator(
  {
    // マイプロフィール画面トップ
    top: {
      screen: MyProfileTopScreen,
      navigationOptions: () => ({
        headerTitle: "プロフィール",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // 設定画面
    setting: {
      screen: SettingNavigator,
      navigationOptions: () => ({
        header: null
      })
    },
    // マイフォロー一覧画面
    myFollow: {
      screen: FollowScreen,
      navigationOptions: () => ({
        headerTitle: "フォロー",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // マイフォロワー一覧画面
    myFollower: {
      screen: FollowerScreen,
      navigationOptions: () => ({
        headerTitle: "フォロワー",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // ユーザー詳細画面
    profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: "ユーザー詳細",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // フォロー一覧画面
    follow: {
      screen: FollowScreen,
      navigationOptions: () => ({
        headerTitle: "フォロー",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // フォロワー一覧画面
    follower: {
      screen: FollowerScreen,
      navigationOptions: () => ({
        headerTitle: "フォロワー",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(ProfileNavigator);
