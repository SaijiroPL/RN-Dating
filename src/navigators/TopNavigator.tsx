import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import AppTopScreen from 'app/src/screens/TopScreen/AppTopScreen';
import TermsScreen from 'app/src/screens/TopScreen/TermsScreen';
import PrivacyPolycyScreen from 'app/src/screens/TopScreen/PrivacyPolicyScreen';

const TopStack = createStackNavigator();

/** アプリトップ画面のナビゲーター */
const TopNavigator: React.FC = () => (
  <TopStack.Navigator>
    <TopStack.Screen
      name="top"
      component={AppTopScreen}
      options={{ headerShown: false }}
    />
    <TopStack.Screen
      name="terms"
      component={TermsScreen}
      options={{ title: '利用規約' }}
    />
    <TopStack.Screen
      name="privacy"
      component={PrivacyPolycyScreen}
      options={{ title: 'プライバシーポリシー' }}
    />
  </TopStack.Navigator>
);

export default TopNavigator;
