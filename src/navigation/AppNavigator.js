import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// Navigator
import MainTabNavigator from './MainTabNavigator';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';

const SwitchNavigator = createSwitchNavigator(
  {
    // ウェルカム画面
    welcome: { screen: WelcomeScreen },
    // メイン画面
    main: { screen: MainTabNavigator },
  }
);

export default createAppContainer(SwitchNavigator);