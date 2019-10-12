import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SearchScreen from "app/src/screens/SearchScreen";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetailScreen";
import CommentScreen from "app/src/screens/DetailScreen/CommentScreen";
import LikeUserScreen from "app/src/screens/DetailScreen/LikeUserScreen";
import ProfileScreen from "app/src/screens/UserScreen/ProfileScreen";
import FollowScreen from "app/src/screens/SettingScreen/FollowScreen";
import FollowerScreen from "app/src/screens/SettingScreen/FollowerScreen";
import { appTextStyle } from "app/src/styles";

/**
 * 検索タブのナビゲーター
 * @author kotatanaka
 */
const SearchNavigator = createStackNavigator(
  {
    // 検索画面トップ
    top: {
      screen: SearchScreen,
      navigationOptions: () => ({
        headerTitle: "検索",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // デートプラン詳細画面
    detail: {
      screen: PlanDetailScreen,
      navigationOptions: () => ({
        headerTitle: "プラン詳細",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // コメント一覧画面
    comment: {
      screen: CommentScreen,
      navigationOptions: () => ({
        headerTitle: "コメント",
        headerTitleStyle: appTextStyle.defaultText
      })
    },
    // お気に入り登録者一覧画面
    like: {
      screen: LikeUserScreen,
      navigationOptions: () => ({
        headerTitle: "お気に入り",
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

export default createAppContainer(SearchNavigator);
