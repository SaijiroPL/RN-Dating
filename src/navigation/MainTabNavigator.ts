import { createStackNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// from app
import HomeScreen from "app/src/screens/HomeScreen/HomeTop";
import SearchScreen from "app/src/screens/SearchScreen/SearchTop";
import MyPlanScreen from "app/src/screens/MyPlanScreen/MyPlanTop";
import NotificationScreen from "app/src/screens/NotificationScreen/NotificationTop";
import ProfileScreen from "app/src/screens/ProfileScreen/ProfileTop";
import {
  HomeTabIcon,
  SearchTabIcon,
  MyPlanTabIcon,
  NotificationTabIcon,
  ProfileTabIcon
} from "app/src/components/Tab";

/**
 * StackNavigatorを作成する関数
 * @param title タブのタイトル
 * @param screen 対象画面
 */
const createTabStack = (title: string, screen: any) =>
  createStackNavigator({
    [title]: { screen }
  });

/**
 * メイン画面のBottomTabNavigator
 * @author tanakakota
 */
const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    // 検索タブの設定
    SearchTab: {
      screen: createTabStack("SearchTab", SearchScreen),
      navigationOptions: () => ({
        title: "検索",
        tabBarIcon: SearchTabIcon
      })
    },
    // マイプランタブの設定
    MyPlanTab: {
      screen: createTabStack("MyPlanTab", MyPlanScreen),
      navigationOptions: () => ({
        title: "マイプラン",
        tabBarIcon: MyPlanTabIcon
      })
    },
    // ホームタブの設定
    HomeTab: {
      screen: createTabStack("HomeTab", HomeScreen),
      navigationOptions: () => ({
        title: "ホーム",
        tabBarIcon: HomeTabIcon
      })
    },
    // 通知タブの設定
    NotificationTab: {
      screen: createTabStack("NotificationTab", NotificationScreen),
      navigationOptions: () => ({
        title: "通知",
        tabBarIcon: NotificationTabIcon
      })
    },
    // プロフィールタブの設定
    ProfileTab: {
      screen: createTabStack("ProfileTab", ProfileScreen),
      navigationOptions: () => ({
        title: "プロフィール",
        tabBarIcon: ProfileTabIcon
      })
    }
  },
  // タブナビゲーション全体の設定
  {
    shifting: true,
    activeTintColor: "orange",
    inactiveTintColor: "#bbb",
    barStyle: {
      backgroundColor: "#fff"
    }
  }
);

export default createAppContainer(BottomTabNavigator);
