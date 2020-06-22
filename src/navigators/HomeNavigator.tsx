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
import CreateSpotScreen from 'app/src/screens/PostScreen/CreateSpotScreen__PENDING';
import CreatePlanNavigator from 'app/src/navigators/CreatePlanNavigator';

const HomeStack = createStackNavigator();

/** ホームタブのナビゲーター */
const HomeNavigator: React.FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Top"
      component={HomeScreen}
      options={{ title: 'ホーム' }}
    />
    <HomeStack.Screen
      name="Detail"
      component={PlanDetailScreen}
      options={{ title: 'プラン詳細' }}
    />
    <HomeStack.Screen
      name="Comment"
      component={CommentScreen}
      options={{ title: 'コメント' }}
    />
    <HomeStack.Screen
      name="Like"
      component={LikeUserScreen}
      options={{ title: 'お気に入り' }}
    />
    <HomeStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'ユーザー詳細' }}
    />
    <HomeStack.Screen
      name="Follow"
      component={FollowScreen}
      options={{ title: 'フォロー' }}
    />
    <HomeStack.Screen
      name="Follower"
      component={FollowerScreen}
      options={{ title: 'フォロワー' }}
    />
    <HomeStack.Screen
      name="Create"
      component={CreatePlanNavigator}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="CreateSpot"
      component={CreateSpotScreen}
      options={{ title: 'スポット作成' }}
    />
  </HomeStack.Navigator>
);

export default HomeNavigator;
