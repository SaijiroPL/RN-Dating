import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// from app
import { COLOR } from 'app/src/constants';
import HomeNavigator from 'app/src/navigators/HomeNavigator';
import SearchNavigator from 'app/src/navigators/SearchNavigator';
import MyPlanNavigator from 'app/src/navigators/MyPlanNavigator';
import NotificationNavigator from 'app/src/navigators/NotificationNavigator';
import MyProfileNavigator from 'app/src/navigators/MyProfileNavigator';
import {
  HomeTabIcon,
  SearchTabIcon,
  MyPlanTabIcon,
  NotificationTabIcon,
  ProfileTabIcon,
} from 'app/src/components/TabIcons';

/** メイン画面のタブナビゲーター */
const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    // 検索
    SearchTab: {
      screen: SearchNavigator,
      navigationOptions: () => ({
        title: '検索',
        tabBarIcon: SearchTabIcon,
      }),
    },
    // マイプラン
    MyPlanTab: {
      screen: MyPlanNavigator,
      navigationOptions: () => ({
        title: 'マイプラン',
        tabBarIcon: MyPlanTabIcon,
      }),
    },
    // ホーム
    HomeTab: {
      screen: HomeNavigator,
      navigationOptions: () => ({
        title: 'ホーム',
        tabBarIcon: HomeTabIcon,
      }),
    },
    // 通知
    NotificationTab: {
      screen: NotificationNavigator,
      navigationOptions: () => ({
        title: '通知',
        tabBarIcon: NotificationTabIcon,
      }),
    },
    // プロフィール
    ProfileTab: {
      screen: MyProfileNavigator,
      navigationOptions: () => ({
        title: 'プロフィール',
        tabBarIcon: ProfileTabIcon,
      }),
    },
  },
  {
    initialRouteName: 'HomeTab',
    activeColor: COLOR.tintColor,
    inactiveColor: COLOR.inactiveColor,
    barStyle: {
      backgroundColor: COLOR.backgroundColor,
    },
  },
);

export default createAppContainer(BottomTabNavigator);
