import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeTopScreen from "app/src/screens/HomeScreen/HomeTopScreen";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetailScreen";
import CommentScreen from "app/src/screens/DetailScreen/CommentScreen";
import LikeUserScreen from "app/src/screens/DetailScreen/LikeUserScreen";
import ProfileScreen from "app/src/screens/DetailScreen/ProfileScreen";
import FollowScreen from "app/src/screens/MyProfileScreen/FollowScreen";
import FollowerScreen from "app/src/screens/MyProfileScreen/FollowerScreen";
import CreatePlanNavigator from "app/src/navigators/CreatePlanNavigator";
import appStyle from "app/src/styles/common-style";

/**
 * ホームタブのナビゲーター
 * @author kotatanaka
 */
const HomeNavigator = createStackNavigator(
  {
    // ホーム画面トップ
    top: {
      screen: HomeTopScreen,
      navigationOptions: () => ({
        headerTitle: "ホーム",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // デートプラン詳細画面
    detail: {
      screen: PlanDetailScreen,
      navigationOptions: () => ({
        headerTitle: "プラン詳細",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // コメント一覧画面
    comment: {
      screen: CommentScreen,
      navigationOptions: () => ({
        headerTitle: "コメント",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // お気に入り登録者一覧画面
    like: {
      screen: LikeUserScreen,
      navigationOptions: () => ({
        headerTitle: "お気に入り",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // ユーザー詳細画面
    profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: "ユーザー詳細",
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
    },
    // プラン作成画面
    create: {
      screen: CreatePlanNavigator,
      navigationOptions: () => ({
        // headerTransparent: true
        header: null
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(HomeNavigator);
