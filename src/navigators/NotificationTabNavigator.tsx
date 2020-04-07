import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// from app
import NotificationAllScreen from 'app/src/screens/NotificationScreen/NotificationAllScreen';
import InformationScreen from 'app/src/screens/NotificationScreen/InformationScreen';

const NotificationTopTab = createMaterialTopTabNavigator();

/** 通知タブのタブナビゲーター */
const NotificationTabNavigator: React.FC = () => (
  <NotificationTopTab.Navigator>
    <NotificationTopTab.Screen
      name="Notification"
      component={NotificationAllScreen}
      options={{ title: 'すべて' }}
    />
    <NotificationTopTab.Screen
      name="Information"
      component={InformationScreen}
      options={{ title: 'お知らせ' }}
    />
  </NotificationTopTab.Navigator>
);

export default NotificationTabNavigator;
