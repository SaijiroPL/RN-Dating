import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import AppTopScreen from 'app/src/screens/TopScreen/AppTopScreen';
import TermsScreen from 'app/src/screens/TopScreen/TermsScreen';
import PrivacyPolycyScreen from 'app/src/screens/TopScreen/PrivacyPolicyScreen';

const TopStack = createStackNavigator();

/** アプリトップ画面のナビゲーター */
const TopNavigator: React.FC = () => (
  <NavigationContainer>
    <TopStack.Navigator>
      <TopStack.Screen name="top" component={AppTopScreen} />
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
  </NavigationContainer>
);

export default TopNavigator;
