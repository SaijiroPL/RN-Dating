import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import MyPlanTopScreen from "app/src/screens/MyPlanScreen/MyPlanTop";
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
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MyPlanNavigator);
