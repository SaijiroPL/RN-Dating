import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SearchTopScreen from "app/src/screens/SearchScreen/SearchTopScreen";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetailScreen";
import CommentScreen from "app/src/screens/DetailScreen/CommentScreen";
import appStyle from "app/src/styles/common-style";

/**
 * 検索タブのナビゲーター
 * @author kotatanaka
 */
const SearchNavigator = createStackNavigator(
  {
    // 検索画面トップ
    top: {
      screen: SearchTopScreen,
      navigationOptions: () => ({
        headerTitle: "検索",
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

export default createAppContainer(SearchNavigator);
