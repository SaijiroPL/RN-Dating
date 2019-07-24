import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import CreatePlanTopScreen from "app/src/screens/HomeScreen/CreatePlanTopScreen";
import appStyle from "app/src/styles/common-style";

/**
 * プラン作成画面のナビゲーター
 * @author kotatanaka
 */
const CreatePlanNavigator = createStackNavigator(
  {
    // ホーム画面トップ
    top: {
      screen: CreatePlanTopScreen,
      navigationOptions: () => ({
        headerTitle: "プラン作成",
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(CreatePlanNavigator);
