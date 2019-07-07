import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyPlanTopScreen from "app/src/screens/MyPlanScreen/MyPlanTop";

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
        headerTitle: "マイプラン"
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MyPlanNavigator);
