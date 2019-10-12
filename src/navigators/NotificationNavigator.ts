import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// from app
import { COLOR } from "app/src/constants";
import NotificationFollowScreen from "app/src/screens/NotificationScreen/NotificationFollowScreen";
import NotificationLikeScreen from "app/src/screens/NotificationScreen/NotificationLikeScreen";
import { appTextStyle } from "app/src/styles";

/**
 * 通知タブのタブナビゲーター
 * @author kotatanaka
 */
const NotificationTabNavigator = createMaterialTopTabNavigator(
  {
    // フォロー通知一覧画面
    FollowTab: {
      screen: NotificationFollowScreen,
      navigationOptions: () => ({
        title: "フォロー",
        titleStyle: appTextStyle.defaultText
      })
    },
    // お気に入り通知一覧画面
    LikeTab: {
      screen: NotificationLikeScreen,
      navigationOptions: () => ({
        title: "お気に入り",
        titleStyle: appTextStyle.defaultText
      })
    }
  },
  // タブナビゲーション全体の設定
  {
    initialRouteName: "FollowTab",
    tabBarOptions: {
      activeTintColor: COLOR.tintColor,
      inactiveTintColor: COLOR.inactiveColor,
      style: {
        backgroundColor: COLOR.backgroundColor
      }
    },
    animationEnabled: false
  }
);

/**
 * 通知タブのタブナビゲーター
 * @author kotatanaka
 */
const NotificationNavigator = createStackNavigator(
  {
    top: {
      screen: NotificationTabNavigator,
      navigationOptions: () => ({
        headerTitle: "通知",
        headerTitleStyle: appTextStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(NotificationNavigator);
