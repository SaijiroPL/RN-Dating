import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import HomeScreen from 'app/src/screens/PlanScreen/HomeScreen';
import PlanDetailScreen from 'app/src/screens/PlanScreen/PlanDetailScreen';
import CommentScreen from 'app/src/screens/PlanScreen/CommentScreen';
import LikeUserScreen from 'app/src/screens/PlanScreen/LikeUserScreen';
import ProfileScreen from 'app/src/screens/UserScreen/ProfileScreen';
import FollowScreen from 'app/src/screens/UserScreen/FollowScreen';
import FollowerScreen from 'app/src/screens/UserScreen/FollowerScreen';
import CreatePlanNavigator from 'app/src/navigators/CreatePlanNavigator';

const HomeStack = createStackNavigator();

/** ホームタブのナビゲーター */
const HomeNavigator: React.FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="top"
      component={HomeScreen}
      options={{ title: 'ホーム' }}
    />
    <HomeStack.Screen
      name="detail"
      component={PlanDetailScreen}
      options={{ title: 'プラン詳細' }}
    />
    <HomeStack.Screen
      name="comment"
      component={CommentScreen}
      options={{ title: 'コメント' }}
    />
    <HomeStack.Screen
      name="like"
      component={LikeUserScreen}
      options={{ title: 'お気に入り' }}
    />
    <HomeStack.Screen
      name="profile"
      component={ProfileScreen}
      options={{ title: 'ユーザー詳細' }}
    />
    <HomeStack.Screen
      name="follow"
      component={FollowScreen}
      options={{ title: 'フォロー' }}
    />
    <HomeStack.Screen
      name="follower"
      component={FollowerScreen}
      options={{ title: 'フォロワー' }}
    />
    <HomeStack.Screen
      name="create"
      component={CreatePlanNavigator}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

export default HomeNavigator;
