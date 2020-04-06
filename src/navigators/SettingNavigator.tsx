import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// from app
import SettingTopScreen from 'app/src/screens/SettingScreen/SettingTopScreen';
import ChangePasswordScreen from 'app/src/screens/SettingScreen/ChangePasswordScreen';
import DeleteHistoryScreen from 'app/src/screens/SettingScreen/DeleteHistoryScreen';
import EditProfileScreen from 'app/src/screens/SettingScreen/EditProfileScreen';
import FaqScreen from 'app/src/screens/SettingScreen/FaqScreen';
import LinkedAccountScreen from 'app/src/screens/SettingScreen/LinkedAccountScreen';
import LogoutScreen from 'app/src/screens/SettingScreen/LogoutScreen';
import PrivacyPolicyScreen from 'app/src/screens/TopScreen/PrivacyPolicyScreen';
import TermsScreen from 'app/src/screens/TopScreen/TermsScreen';

const SettingStack = createStackNavigator();

/** 設定画面のナビゲーター */
const SettingNavigator: React.FC = () => (
  <NavigationContainer>
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="top"
        component={SettingTopScreen}
        options={{ title: '設定' }}
      />
      <SettingStack.Screen
        name="pass"
        component={ChangePasswordScreen}
        options={{ title: 'パスワード変更' }}
      />
      <SettingStack.Screen
        name="history"
        component={DeleteHistoryScreen}
        options={{ title: '検索履歴の削除' }}
      />
      <SettingStack.Screen
        name="profile"
        component={EditProfileScreen}
        options={{ title: 'プロフィール編集' }}
      />
      <SettingStack.Screen
        name="faq"
        component={FaqScreen}
        options={{ title: 'ヘルプセンター' }}
      />
      <SettingStack.Screen
        name="account"
        component={LinkedAccountScreen}
        options={{ title: 'リンク済みアカウント' }}
      />
      <SettingStack.Screen
        name="logout"
        component={LogoutScreen}
        options={{ title: 'ログアウト' }}
      />
      <SettingStack.Screen
        name="terms"
        component={TermsScreen}
        options={{ title: '利用規約' }}
      />
      <SettingStack.Screen
        name="privacy"
        component={PrivacyPolicyScreen}
        options={{ title: 'プライバシーポリシー' }}
      />
    </SettingStack.Navigator>
  </NavigationContainer>
);

export default SettingNavigator;
