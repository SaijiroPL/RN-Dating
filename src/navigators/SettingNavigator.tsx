import React from 'react';
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
import SCCScreen from 'app/src/screens/TopScreen/SCCScreen';
import AboutScreen from 'app/src/screens/TopScreen/AboutScreen';

const SettingStack = createStackNavigator();

/** 設定画面のナビゲーター */
const SettingNavigator: React.FC = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen
      name="Top"
      component={SettingTopScreen}
      options={{ title: '設定' }}
    />
    <SettingStack.Screen
      name="Pass"
      component={ChangePasswordScreen}
      options={{ title: 'パスワード変更' }}
    />
    <SettingStack.Screen
      name="History"
      component={DeleteHistoryScreen}
      options={{ title: '検索履歴の削除' }}
    />
    <SettingStack.Screen
      name="Profile"
      component={EditProfileScreen}
      options={{ title: 'プロフィール編集' }}
    />
    <SettingStack.Screen
      name="Faq"
      component={FaqScreen}
      options={{ title: 'ヘルプセンター' }}
    />
    <SettingStack.Screen
      name="Account"
      component={LinkedAccountScreen}
      options={{ title: 'リンク済みアカウント' }}
    />
    <SettingStack.Screen
      name="Logout"
      component={LogoutScreen}
      options={{ title: 'ログアウト' }}
    />
    <SettingStack.Screen
      name="Terms"
      component={TermsScreen}
      options={{ title: '利用規約' }}
    />
    <SettingStack.Screen
      name="Privacy"
      component={PrivacyPolicyScreen}
      options={{ title: 'プライバシーポリシー' }}
    />
    <SettingStack.Screen
      name="SCC"
      component={SCCScreen}
      options={{ title: '特定商取引法' }}
    />
    <SettingStack.Screen
      name="About"
      component={AboutScreen}
      options={{ title: '運営主体について' }}
    />
  </SettingStack.Navigator>
);

export default SettingNavigator;
