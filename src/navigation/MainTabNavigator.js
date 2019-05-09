import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

// Screens
import HomeScreen from 'app/src/screens/HomeScreen';
import SearchScreen from 'app/src/screens/SearchScreen';
import MyPlanScreen from 'app/src/screens/MyPlanScreen';
import NotificationScreen from 'app/src/screens/NotificationScreen';
import ProfileScreen from 'app/src/screens/ProfileScreen';

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
  homeStack: { screen: HomeStack },
  searchStack: { screen: SearchStack },
  myPlanStack: { screen: MyPlanStack },
  notificationStack: { screen: NotificationStack },
  profileStack: { screen: ProfileStack },
});

export default createAppContainer(BottomTabNavigator);
