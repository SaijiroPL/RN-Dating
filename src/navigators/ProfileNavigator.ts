import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import ProfileTopScreen from "app/src/screens/ProfileScreen/ProfileTopScreen";
import appStyle from "app/src/styles/common-style";

/**
 * プロフィールタブのナビゲーター
 * @author kotatanaka
 */
const ProfileNavigator = createStackNavigator(
  {
    // プロフィール画面トップ
    top: {
      screen: ProfileTopScreen,
      navigationOptions: () => ({
        headerTitle: "プロフィール",
        headerTitleStyle: appStyle.defaultText
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(ProfileNavigator);
