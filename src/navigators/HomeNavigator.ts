import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeTopScreen from "app/src/screens/HomeScreen/HomeTop";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetail";
import CommentScreen from "app/src/screens/HomeScreen/Comment";
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
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(HomeNavigator);
