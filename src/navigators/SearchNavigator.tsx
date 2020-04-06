import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import SearchScreen from 'app/src/screens/PlanScreen/SearchScreen';
import PlanDetailScreen from 'app/src/screens/PlanScreen/PlanDetailScreen';
import CommentScreen from 'app/src/screens/PlanScreen/CommentScreen';
import LikeUserScreen from 'app/src/screens/PlanScreen/LikeUserScreen';
import ProfileScreen from 'app/src/screens/UserScreen/ProfileScreen';
import FollowScreen from 'app/src/screens/UserScreen/FollowScreen';
import FollowerScreen from 'app/src/screens/UserScreen/FollowerScreen';

const SearchStack = createStackNavigator();

/** 検索タブのナビゲーター */
const SearchNavigator: React.FC = () => (
  <NavigationContainer>
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="top"
        component={SearchScreen}
        options={{ title: '検索' }}
      />
      <SearchStack.Screen
        name="detail"
        component={PlanDetailScreen}
        options={{ title: 'プラン詳細' }}
      />
      <SearchStack.Screen
        name="comment"
        component={CommentScreen}
        options={{ title: 'コメント' }}
      />
      <SearchStack.Screen
        name="like"
        component={LikeUserScreen}
        options={{ title: 'お気に入り' }}
      />
      <SearchStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'ユーザー詳細' }}
      />
      <SearchStack.Screen
        name="follow"
        component={FollowScreen}
        options={{ title: 'フォロー' }}
      />
      <SearchStack.Screen
        name="follower"
        component={FollowerScreen}
        options={{ title: 'フォロワー' }}
      />
    </SearchStack.Navigator>
  </NavigationContainer>
);

export default SearchNavigator;
