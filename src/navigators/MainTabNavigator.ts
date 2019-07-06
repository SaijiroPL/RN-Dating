import { createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// from app
import HomeNavigator from "app/src/navigators/HomeNavigator";
import SearchNavigator from "app/src/navigators/SearchNavigator";
import MyPlanNavigator from "app/src/navigators/MyPlanNavigator";
import NotificationNavigator from "app/src/navigators/NotificationNavigator";
import ProfileNavigator from "app/src/navigators/ProfileNavigator";
import {
  HomeTabIcon,
  SearchTabIcon,
  MyPlanTabIcon,
  NotificationTabIcon,
  ProfileTabIcon
} from "app/src/components/Tab";
import colors from "app/src/constants/colors";

/**
 * メイン画面のタブナビゲーター
 * @author kotatanaka
 */
const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    // 検索タブの設定
    SearchTab: {
      screen: SearchNavigator,
      navigationOptions: () => ({
        title: "検索",
        tabBarIcon: SearchTabIcon
      })
    },
    // マイプランタブの設定
    MyPlanTab: {
      screen: MyPlanNavigator,
      navigationOptions: () => ({
        title: "マイプラン",
        tabBarIcon: MyPlanTabIcon
      })
    },
    // ホームタブの設定
    HomeTab: {
      screen: HomeNavigator,
      navigationOptions: () => ({
        title: "ホーム",
        tabBarIcon: HomeTabIcon
      })
    },
    // 通知タブの設定
    NotificationTab: {
      screen: NotificationNavigator,
      navigationOptions: () => ({
        title: "通知",
        tabBarIcon: NotificationTabIcon
      })
    },
    // プロフィールタブの設定
    ProfileTab: {
      screen: ProfileNavigator,
      navigationOptions: () => ({
        title: "プロフィール",
        tabBarIcon: ProfileTabIcon
      })
    }
  },
  // タブナビゲーション全体の設定
  {
    shifting: true,
    activeTintColor: colors.tintColor,
    inactiveTintColor: colors.inactiveColor,
    barStyle: {
      backgroundColor: colors.backgroundColor
    }
  }
);

export default createAppContainer(BottomTabNavigator);
