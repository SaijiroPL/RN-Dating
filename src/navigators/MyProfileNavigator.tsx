import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import SettingNavigator from 'app/src/navigators/SettingNavigator';
import MyProfileScreen from 'app/src/screens/UserScreen/MyProfileScreen';
import FollowScreen from 'app/src/screens/UserScreen/FollowScreen';
import FollowerScreen from 'app/src/screens/UserScreen/FollowerScreen';
import ProfileScreen from 'app/src/screens/UserScreen/ProfileScreen';

const MyProfileStack = createStackNavigator();

/**  プロフィールタブのナビゲーター */
const MyProfileNavigator: React.FC = () => (
  <NavigationContainer>
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="top"
        component={MyProfileScreen}
        options={{ title: 'プロフィール' }}
      />
      <MyProfileStack.Screen name="setting" component={SettingNavigator} />
      <MyProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'ユーザー詳細' }}
      />
      <MyProfileStack.Screen
        name="myFollow"
        component={FollowScreen}
        options={{ title: 'フォロー' }}
      />
      <MyProfileStack.Screen
        name="myFollower"
        component={FollowerScreen}
        options={{ title: 'フォロワー' }}
      />
      <MyProfileStack.Screen
        name="follow"
        component={FollowScreen}
        options={{ title: 'フォロー' }}
      />
      <MyProfileStack.Screen
        name="follower"
        component={FollowerScreen}
        options={{ title: 'フォロワー' }}
      />
    </MyProfileStack.Navigator>
  </NavigationContainer>
);

export default MyProfileNavigator;
