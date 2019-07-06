import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import HomeTop from "app/src/screens/HomeScreen/HomeTop";

/**
 * ホームタブのナビゲーター
 * @author kotatanaka
 */
const HomeNavigator = createStackNavigator({
  // ホーム画面トップ
  top: { screen: HomeTop }
});

export default createAppContainer(HomeNavigator);
