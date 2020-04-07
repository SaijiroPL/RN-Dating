import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import MyPlanScreen from 'app/src/screens/PlanScreen/MyPlanScreen';
import PlanDetailScreen from 'app/src/screens/PlanScreen/PlanDetailScreen';
import CommentScreen from 'app/src/screens/PlanScreen/CommentScreen';
import LikeUserScreen from 'app/src/screens/PlanScreen/LikeUserScreen';
import ProfileScreen from 'app/src/screens/UserScreen/ProfileScreen';
import FollowScreen from 'app/src/screens/UserScreen/FollowScreen';
import FollowerScreen from 'app/src/screens/UserScreen/FollowerScreen';

const MyPlanStack = createStackNavigator();

/** マイプランタブのナビゲーター */
const MyPlanNavigator: React.FC = () => (
  <MyPlanStack.Navigator>
    <MyPlanStack.Screen
      name="Top"
      component={MyPlanScreen}
      options={{ title: 'マイプラン' }}
    />
    <MyPlanStack.Screen
      name="Detail"
      component={PlanDetailScreen}
      options={{ title: 'プラン詳細' }}
    />
    <MyPlanStack.Screen
      name="Comment"
      component={CommentScreen}
      options={{ title: 'コメント' }}
    />
    <MyPlanStack.Screen
      name="Like"
      component={LikeUserScreen}
      options={{ title: 'お気に入り' }}
    />
    <MyPlanStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'ユーザー詳細' }}
    />
    <MyPlanStack.Screen
      name="Follow"
      component={FollowScreen}
      options={{ title: 'フォロー' }}
    />
    <MyPlanStack.Screen
      name="Follower"
      component={FollowerScreen}
      options={{ title: 'フォロワー' }}
    />
  </MyPlanStack.Navigator>
);

export default MyPlanNavigator;
