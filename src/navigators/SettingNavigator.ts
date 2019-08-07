import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SettingTopScreen from "app/src/screens/ProfileScreen/SettingTopScreen";
import appStyle from "app/src/styles/common-style";

/**
 * 設定画面のナビゲーター
 * @author kotatanaka
 */
const SettingNavigator = createStackNavigator(
  {
    // 設定画面トップ
    top: {
      screen: SettingTopScreen,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(SettingNavigator);
