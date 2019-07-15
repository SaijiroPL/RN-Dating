import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import NotificationTopScreen from "app/src/screens/NotificationScreen/NotificationTopScreen";
import appStyle from "app/src/styles/common-style";

/**
 * 通知タブのナビゲーター
 * @author kotatanaka
 */
const NotificationNavigator = createStackNavigator(
  {
    // 通知画面トップ
    top: {
      screen: NotificationTopScreen,
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
