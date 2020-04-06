import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import NotificationTabNavigator from './NotificationTabNavigator';

const NotificationStack = createStackNavigator();

/** 通知タブのナビゲーター */
const NotificationNavigator: React.FC = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="top"
      component={NotificationTabNavigator}
      options={{ title: '通知' }}
    />
  </NotificationStack.Navigator>
);

export default NotificationNavigator;
