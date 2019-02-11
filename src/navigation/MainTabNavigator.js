import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyPlanScreen from '../screens/MyPlanScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

/** ホームタブ */
const HomeStack = createStackNavigator({
    home: HomeScreen,
});

/** 検索タブ */
const SearchStack = createStackNavigator({
  search: SearchScreen,
});

/** マイプランタブ */
const MyPlanStack = createStackNavigator({
  myPlan: MyPlanScreen,
});

/** 通知タブ */
const NotificationStack = createStackNavigator({
  notification: NotificationScreen,
});

/** プロフィールタブ */
const ProfileStack = createStackNavigator({
  profile: ProfileScreen,
});

const BottomTabNavigator = createBottomTabNavigator({
  homeStack: { screen: HomeStack},
  searchStack: { screen: SearchStack },
  myPlanStack: { screen: MyPlanStack },
  notificationStack: { screen: NotificationStack },
  profileStack: { screen: ProfileStack },
});

export default createAppContainer(BottomTabNavigator);