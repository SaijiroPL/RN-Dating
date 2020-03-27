import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeScreen from "app/src/screens/PlanScreen/HomeScreen";
import PlanDetailScreen from "app/src/screens/PlanScreen/PlanDetailScreen";
import CommentScreen from "app/src/screens/PlanScreen/CommentScreen";
import LikeUserScreen from "app/src/screens/PlanScreen/LikeUserScreen";
import ProfileScreen from "app/src/screens/UserScreen/ProfileScreen";
import FollowScreen from "app/src/screens/UserScreen/FollowScreen";
import FollowerScreen from "app/src/screens/UserScreen/FollowerScreen";
import CreatePlanNavigator from "app/src/navigators/CreatePlanNavigator";
import { appTextStyle } from "app/src/styles";
import CreateSpotScreen from "../screens/PlanScreen/CreateSpotScreen";

/**
 * ホームタブのナビゲーター
 * @author kotatanaka
 */
const HomeNavigator = createStackNavigator(
  {
    // ホーム画面トップ
    top: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: "ホーム",
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
    },
    // プラン作成画面
    create: {
      screen: CreatePlanNavigator,
      navigationOptions: () => ({
        // headerTransparent: true
        header: null
      })
    },
    // フォロワー一覧画面
    createspot: {
      screen: CreateSpotScreen,
      navigationOptions: () => ({
        headerTitle: "新規スポット追加",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(HomeNavigator);
