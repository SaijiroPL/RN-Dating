import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyPlanTop from "app/src/screens/MyPlanScreen/MyPlanTop";

/**
 * マイプランタブのナビゲーター
 * @author kotatanaka
 */
const MyPlanNavigator = createStackNavigator(
  {
    // マイプラン画面トップ
    top: {
      screen: MyPlanTop,
      navigationOptions: () => ({
        headerTitle: "マイプラン"
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MyPlanNavigator);
