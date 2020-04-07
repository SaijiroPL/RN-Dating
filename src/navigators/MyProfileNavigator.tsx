import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import SettingNavigator from 'app/src/navigators/SettingNavigator';
import MyProfileScreen from 'app/src/screens/UserScreen/MyProfileScreen';
import FollowScreen from 'app/src/screens/UserScreen/FollowScreen';
import FollowerScreen from 'app/src/screens/UserScreen/FollowerScreen';
import ProfileScreen from 'app/src/screens/UserScreen/ProfileScreen';
import EditPostScreen from 'app/src/screens/PostScreen/EditPostScreen';

const MyProfileStack = createStackNavigator();

/**  プロフィールタブのナビゲーター */
const MyProfileNavigator: React.FC = () => (
  <MyProfileStack.Navigator>
    <MyProfileStack.Screen
      name="Top"
      component={MyProfileScreen}
      options={{ title: 'プロフィール' }}
    />
    <MyProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: 'ユーザー詳細' }}
    />
    <MyProfileStack.Screen
      name="MyFollow"
      component={FollowScreen}
      options={{ title: 'フォロー' }}
    />
    <MyProfileStack.Screen
      name="MyFollower"
      component={FollowerScreen}
      options={{ title: 'フォロワー' }}
    />
    <MyProfileStack.Screen
      name="Follow"
      component={FollowScreen}
      options={{ title: 'フォロー' }}
    />
    <MyProfileStack.Screen
      name="Follower"
      component={FollowerScreen}
      options={{ title: 'フォロワー' }}
    />
    <MyProfileStack.Screen
      name="EditPost"
      component={EditPostScreen}
      options={{ title: 'プラン編集' }}
    />
    <MyProfileStack.Screen
      name="Setting"
      component={SettingNavigator}
      options={{ headerShown: false }}
    />
  </MyProfileStack.Navigator>
);

export default MyProfileNavigator;
