import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
// import GuidePostScreen from 'app/src/screens/PostScreen/GuidePostScreen';
// import PostScreen from 'app/src/screens/PostScreen/PostScreen';
import EditPostScreen from 'app/src/screens/PostScreen/EditPostScreen';

const PostStack = createStackNavigator();

/** 投稿画面のナビゲーター */
const PostNavigator: React.FC = () => (
  <PostStack.Navigator>
    {/* <PostStack.Screen
      name="Post"
      component={PostScreen}
      options={{ title: '投稿' }}
    />
    <PostStack.Screen
      name="GuidePost"
      component={GuidePostScreen}
      options={{ title: '投稿' }}
    /> */}
    <PostStack.Screen
      name="EditPost"
      component={EditPostScreen}
      options={{ title: '投稿編集' }}
    />
  </PostStack.Navigator>
);

export default PostNavigator;
