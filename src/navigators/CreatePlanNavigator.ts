import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import CreatePlanTopScreen from "app/src/screens/HomeScreen/CreatePlanTopScreen";
import SearchMapScreen from "app/src/screens/HomeScreen/SearchMapScreen";
import FlickSpotScreen from "app/src/screens/HomeScreen/FlickSpotScreen";
import SelectSpotScreen from "app/src/screens/HomeScreen/SelectSpotScreen";
import ArrangeRouteScreen from "app/src/screens/HomeScreen/ArrangeRouteScreen";
import CompletePlanScreen from "app/src/screens/HomeScreen/CompletePlanScreen";
import appStyle from "app/src/styles/common-style";

/**
 * プラン作成画面のナビゲーター
 * @author kotatanaka
 */
const CreatePlanNavigator = createStackNavigator(
  {
    // プラン作成画面トップ
    baseInfo: {
      screen: CreatePlanTopScreen,
      navigationOptions: () => ({
        headerTitle: "プラン作成",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // マップで範囲指定画面
    map: {
      screen: SearchMapScreen,
      navigationOptions: () => ({
        headerTitle: "範囲指定",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // デートスポットフリック画面
    flick: {
      screen: FlickSpotScreen,
      navigationOptions: () => ({
        headerTitle: "スポットフリック",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // デートスポット厳選画面
    select: {
      screen: SelectSpotScreen,
      navigationOptions: () => ({
        headerTitle: "洗濯と削除",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // ルート並べ替え画面
    arrange: {
      screen: ArrangeRouteScreen,
      navigationOptions: () => ({
        headerTitle: "入れ替え",
        headerTitleStyle: appStyle.defaultText
      })
    },
    // プラン作成完了画面
    complete: {
      screen: CompletePlanScreen,
      navigationOptions: () => ({
        headerTitle: "完成！",
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(CreatePlanNavigator);
