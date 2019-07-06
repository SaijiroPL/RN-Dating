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
        header: null
      })
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MyPlanNavigator);
