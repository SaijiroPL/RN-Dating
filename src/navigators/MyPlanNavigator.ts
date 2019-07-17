import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyPlanTopScreen from "app/src/screens/MyPlanScreen/MyPlanTopScreen";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetailScreen";
import CommentScreen from "app/src/screens/DetailScreen/CommentScreen";
import appStyle from "app/src/styles/common-style";

/**
 * マイプランタブのナビゲーター
 * @author kotatanaka
 */
const MyPlanNavigator = createStackNavigator(
  {
    // マイプラン画面トップ
    top: {
      screen: MyPlanTopScreen,
      navigationOptions: () => ({
        headerTitle: "マイプラン",
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

export default createAppContainer(MyPlanNavigator);
