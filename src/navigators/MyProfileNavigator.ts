import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyProfileScreen from "app/src/screens/UserScreen/MyProfileScreen";
import FollowScreen from "app/src/screens/UserScreen/FollowScreen";
import FollowerScreen from "app/src/screens/UserScreen/FollowerScreen";
import ProfileScreen from "app/src/screens/UserScreen/ProfileScreen";
import SettingNavigator from "./SettingNavigator";
import { appTextStyle } from "app/src/styles";
import EditPlanScreen from "../screens/ PostScreen/EditPlanScreen";

/**
 * プロフィールタブのナビゲーター
 * @author kotatanaka
 */
const MyProfileNavigator = createStackNavigator(
  {
    // マイプロフィール画面トップ
    top: {
      screen: MyProfileScreen,
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
    },
    // プラン編集画面
    editplan: {
      screen: EditPlanScreen,
      navigationOptions: () => ({
        headerTitle: "プラン編集",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MyProfileNavigator);
