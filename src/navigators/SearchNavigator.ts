import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import SearchTopScreen from "app/src/screens/SearchScreen/SearchTop";

/**
 * 検索タブのナビゲーター
 * @author kotatanaka
 */
const SearchNavigator = createStackNavigator(
  {
    // 検索画面トップ
    top: {
      screen: SearchTopScreen,
      navigationOptions: () => ({
        headerTitle: "検索"
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(SearchNavigator);
