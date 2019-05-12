import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// from app
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';
import TopScreen from 'app/src/screens/TopScreen';
import WelcomeScreen from 'app/src/screens/WelcomeScreen';

/**
 * アプリケーション全体のSwitchNavigator
 * @author tanakakota
 */
const SwitchNavigator = createSwitchNavigator(
  {
    // トップ画面
    top: { screen: TopScreen },
    // ウェルカム画面
    welcome: { screen: WelcomeScreen },
    // メイン画面
    main: { screen: MainTabNavigator },
  },
);

export default createAppContainer(SwitchNavigator);
