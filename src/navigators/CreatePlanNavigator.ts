import { createStackNavigator, createAppContainer } from 'react-navigation';

// from app
import CreatePlanTopScreen from 'app/src/screens/CreatePlanScreen/CreatePlanTopScreen';
import SearchMapScreen from 'app/src/screens/CreatePlanScreen/SearchMapScreen';
import SwipeSpotScreen from 'app/src/screens/CreatePlanScreen/SwipeSpotScreen';
import SelectSpotScreen from 'app/src/screens/CreatePlanScreen/SelectSpotScreen';
import ArrangeRouteScreen from 'app/src/screens/CreatePlanScreen/ArrangeRouteScreen';
import CompletePlanScreen from 'app/src/screens/CreatePlanScreen/CompletePlanScreen';
import PlanDetailScreen from 'app/src/screens/PlanScreen/PlanDetailScreen';
import HomeScreen from 'app/src/screens/PlanScreen/HomeScreen';
import { appTextStyle } from 'app/src/styles';

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
        headerTitle: 'プラン作成',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // マップで範囲指定画面
    map: {
      screen: SearchMapScreen,
      navigationOptions: () => ({
        headerTitle: '範囲指定',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // デートスポットスワイプ画面
    flick: {
      screen: SwipeSpotScreen,
      navigationOptions: () => ({
        headerTitle: 'スポットスワイプ',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // デートスポット厳選画面
    select: {
      screen: SelectSpotScreen,
      navigationOptions: () => ({
        headerTitle: '選択と削除',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // ルート並べ替え画面
    arrange: {
      screen: ArrangeRouteScreen,
      navigationOptions: () => ({
        headerTitle: '入れ替え',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // プラン作成完了画面
    complete: {
      screen: CompletePlanScreen,
      navigationOptions: () => ({
        headerTitle: '完成！',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // プラン作成後「すぐに案内する」でルート案内画面に移動
    plan: {
      screen: PlanDetailScreen,
      navigationOptions: () => ({
        headerTitle: 'プラン詳細',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
    // プラン作成後「ホームへ」でホーム画面に移動
    home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'ホーム',
        headerTitleStyle: appTextStyle.defaultText,
      }),
    },
  },
  {
    headerBackTitleVisible: false,
  },
);

export default createAppContainer(CreatePlanNavigator);
