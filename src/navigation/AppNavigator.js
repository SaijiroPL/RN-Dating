import {
  // createSwitchNavigator,
  // createAppContainer,
  createStackNavigator,
  NavigationActions,
} from 'react-navigation';

// from app
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';
import TopScreen from 'app/src/screens/TopScreen';
import WelcomeScreen from 'app/src/screens/WelcomeScreen';

/**
 * アプリケーション全体のNavigator
 * @author tanakakota
 */
// const SwitchNavigator = createSwitchNavigator(
const AppNavigator = createStackNavigator(
  {
    // トップ画面
    top: { screen: TopScreen },
    // ウェルカム画面
    welcome: { screen: WelcomeScreen },
    // メイン画面
    main: { screen: MainTabNavigator },
  },
);

/** 同じスクリーンに遷移しないようにする */
const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;

  if (state && type === NavigationActions.NAVIGATE) {
    // 直前のrouteNameと遷移先のrouteNameが同じであれば遷移を無効化
    if (routeName === state.routes[state.routes.length - 1].routeName) return null;
  }

  return getStateForAction(action, state);
};

/** アクティブになっているrouteNameを取得する */
export const getActiveRouteName = (navigationState) => {
  if (!navigateOnce) return null;

  // アクティブな子routeを取得する
  const route = navigationState.routes[navigationState.index];

  // 子routeがあれば再帰的に呼び出す
  if (route.routes) return getActiveRouteName(route);

  // 子routeを持たないならばrouteNameを返却する
  return route.routeName;
};

// ルーティングの際にStoreのStateを取得する
// SwitchNavigator.router.getStateForAction = navigateOnce(SwitchNavigator.router.getStateForAction);
AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

// export default createAppContainer(SwitchNavigator);
export default AppNavigator;
