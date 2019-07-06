import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import NotificationTop from "app/src/screens/NotificationScreen/NotificationTop";

/**
 * 通知タブのナビゲーター
 * @author kotatanaka
 */
const NotificationNavigator = createStackNavigator({
  // 通知画面トップ
  top: {
    screen: NotificationTop,
    navigationOptions: () => ({
      header: null
    })
  }
});

export default createAppContainer(NotificationNavigator);
