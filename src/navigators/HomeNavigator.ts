import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeTop from "app/src/screens/HomeScreen/HomeTop";
import PlanDetail from "app/src/screens/DetailScreen/PlanDetail";

/**
 * ホームタブのナビゲーター
 * @author kotatanaka
 */
const HomeNavigator = createStackNavigator(
  {
    // ホーム画面トップ
    top: {
      screen: HomeTop,
      navigationOptions: () => ({
        headerTitle: "ホーム"
      })
    },
    // デートプラン詳細画面
    detail: {
      screen: PlanDetail,
      navigationOptions: () => ({
        headerTitle: "プラン詳細"
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(HomeNavigator);
