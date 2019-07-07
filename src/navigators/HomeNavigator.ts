import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeTopScreen from "app/src/screens/HomeScreen/HomeTop";
import PlanDetailScreen from "app/src/screens/DetailScreen/PlanDetail";

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
        headerTitle: "ホーム"
      })
    },
    // デートプラン詳細画面
    detail: {
      screen: PlanDetailScreen,
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
