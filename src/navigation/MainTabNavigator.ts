import {
  createStackNavigator,
  // createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// from app
import HomeScreen from "app/src/screens/HomeScreen";
import SearchScreen from "app/src/screens/SearchScreen";
import MyPlanScreen from "app/src/screens/MyPlanScreen";
import NotificationScreen from "app/src/screens/NotificationScreen";
import ProfileScreen from "app/src/screens/ProfileScreen";
import {
  HomeTabIcon,
  SearchTabIcon,
  MyPlanTabIcon,
  NotificationTabIcon,
  ProfileTabIcon
  // TabBar
} from "app/src/components/Tab";

/**
 * StackNavigatorを作成する関数
 * @param title タブのタイトル
 * @param screen 対象画面
 */
const createTabStack = (title: string, screen: typeof HomeScreen) =>
  createStackNavigator({
    [title]: { screen }
  });

/**
 * メイン画面のBottomTabNavigator
 * @author tanakakota
 */
// const BottomTabNavigator = createBottomTabNavigator(
const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    // ホームタブの設定
    // TODO ホームタブをボトムバーの真ん中に配置
    HomeTab: {
      screen: createTabStack("HomeTab", HomeScreen),
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon
      })
    },
    // 検索タブの設定
    SearchTab: {
      screen: createTabStack("SearchTab", SearchScreen),
      navigationOptions: () => ({
        tabBarIcon: SearchTabIcon
      })
    },
    // マイプランタブの設定
    MyPlanTab: {
      screen: createTabStack("MyPlanTab", MyPlanScreen),
      navigationOptions: () => ({
        tabBarIcon: MyPlanTabIcon
      })
    },
    // 通知タブの設定
    NotificationTab: {
      screen: createTabStack("NotificationTab", NotificationScreen),
      navigationOptions: () => ({
        tabBarIcon: NotificationTabIcon
      })
    },
    // プロフィールタブの設定
    ProfileTab: {
      screen: createTabStack("ProfileTab", ProfileScreen),
      navigationOptions: () => ({
        tabBarIcon: ProfileTabIcon
      })
    }
  },
  // タブナビゲーション全体の設定
  {
    // tabBarOptions: {
    //   showLabel: false,
    //   activeTintColor: "orange",
    //   inactiveTintColor: "#bbb",
    //   style: {
    //     backgroundColor: "#fff"
    //   }
    // },
    // tabBarComponent: TabBar,
    // tabBarPosition: "bottom",
    // animationEnabled: false,
    // swipeEnabled: false
    shifting: true,
    activeTintColor: "orange",
    inactiveTintColor: "#bbb"
  }
);

// export default BottomTabNavigator;
export default createAppContainer(BottomTabNavigator);
