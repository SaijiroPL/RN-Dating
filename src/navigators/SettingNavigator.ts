import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SettingTopScreen from "app/src/screens/MyProfileScreen/SettingTopScreen";

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
