import { createStackNavigator, createAppContainer } from "react-navigation";

// from app
import ProfileTop from "app/src/screens/ProfileScreen/ProfileTop";

/**
 * プロフィールタブのナビゲーター
 * @author kotatanaka
 */
const ProfileNavigator = createStackNavigator(
  {
    // プロフィール画面トップ
    top: {
      screen: ProfileTop,
      navigationOptions: () => ({
        headerTitle: "プロフィール"
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(ProfileNavigator);
