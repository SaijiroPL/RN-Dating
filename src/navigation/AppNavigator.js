import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Navigator
import MainTabNavigator from 'app/src/navigation/MainTabNavigator';

// Screens
import WelcomeScreen from 'app/src/screens/WelcomeScreen';

const SwitchNavigator = createSwitchNavigator(
  {
    // ウェルカム画面
    welcome: { screen: WelcomeScreen },
    // メイン画面
    main: { screen: MainTabNavigator },
  },
);

export default createAppContainer(SwitchNavigator);
