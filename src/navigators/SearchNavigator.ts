import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SearchScreen from "app/src/screens/SearchScreen/SearchTop";

/**
 * 検索タブのナビゲーター
 * @author kotatanaka
 */
const SearchNavigator = createStackNavigator(
  {
    // 検索画面トップ
    top: {
      screen: SearchScreen,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(SearchNavigator);
