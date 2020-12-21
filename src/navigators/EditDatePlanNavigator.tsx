import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import EditDatePlanScreen from 'app/src/screens/EditDatePlanScreen/EditDatePlanScreen';

const PostStack = createStackNavigator();

/** 投稿画面のナビゲーター */
const PostNavigator: React.FC = () => (
  <PostStack.Navigator>
    <PostStack.Screen
      name="EditDatePlan"
      component={EditDatePlanScreen}
      options={{ title: '投稿編集' }}
    />
  </PostStack.Navigator>
);

export default PostNavigator;
