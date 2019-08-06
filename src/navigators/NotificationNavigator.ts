import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// from app
import NotificationFollowScreen from "app/src/screens/NotificationScreen/NotificationFollowScreen";
import NotificationLikeScreen from "app/src/screens/NotificationScreen/NotificationLikeScreen";
import Colors from "app/src/constants/Colors";
import appStyle from "app/src/styles/common-style";

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
        titleStyle: appStyle.defaultText
      })
    },
    // お気に入り通知一覧画面
    LikeTab: {
      screen: NotificationLikeScreen,
      navigationOptions: () => ({
        title: "お気に入り",
        titleStyle: appStyle.defaultText
      })
    }
  },
  // タブナビゲーション全体の設定
  {
    initialRouteName: "FollowTab",
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.inactiveColor,
      style: {
        backgroundColor: Colors.backgroundColor
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
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(NotificationNavigator);
