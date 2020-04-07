import { createStackNavigator, createAppContainer } from 'react-navigation';

// from app

import { appTextStyle } from '../styles';
import GuidePostScreen from '../screens/PostScreen/GuidePostScreen';
import PostScreen from '../screens/PostScreen/PostScreen';
import EditPostScreen from '../screens/PostScreen/EditPostScreen';

/**
 * 検索タブのナビゲーター
 * @author kotatanaka
 */
const PostNavigator = createStackNavigator({
  // 投稿画面
  post: {
    screen: PostScreen,
    navigationOptions: () => ({
      headerTitle: '投稿',
      headerTitleStyle: appTextStyle.defaultText,
    }),
  },
  guidepost: {
    screen: GuidePostScreen,
    navigationOptions: () => ({
      headerTitle: '投稿',
      headerTitleStyle: appTextStyle.defaultText,
    }),
  },
  editpost: {
    screen: EditPostScreen,
    navigationOptions: () => ({
      headerTitle: '投稿編集',
      headerTitleStyle: appTextStyle.defaultText,
    }),
  },
});

export default createAppContainer(PostNavigator);
