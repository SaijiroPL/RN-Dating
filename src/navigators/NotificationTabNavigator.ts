import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

// from app
import { COLOR } from 'app/src/constants';
import NotificationAllScreen from 'app/src/screens/NotificationScreen/NotificationAllScreen';
import InformationScreen from 'app/src/screens/NotificationScreen/InformationScreen';
import { appTextStyle } from 'app/src/styles';

/** 通知タブのタブナビゲーター */
const NotificationTabNavigator = createMaterialTopTabNavigator(
  {
    // 通知一覧画面
    NotificationTab: {
      screen: NotificationAllScreen,
      navigationOptions: () => ({
        title: 'すべて',
        titleStyle: appTextStyle.defaultText,
      }),
    },
    // 運営からのお知らせ一覧画面
    InformationTab: {
      screen: InformationScreen,
      navigationOptions: () => ({
        title: 'お知らせ',
        titleStyle: appTextStyle.defaultText,
      }),
    },
  },
  {
    initialRouteName: 'NotificationTab',
    tabBarOptions: {
      activeTintColor: COLOR.tintColor,
      inactiveTintColor: COLOR.inactiveColor,
      style: {
        backgroundColor: COLOR.backgroundColor,
      },
    },
    // animationEnabled: false,
  },
);

export default createAppContainer(NotificationTabNavigator);
