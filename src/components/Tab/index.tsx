import React from "react";
import { BottomTabBar } from "react-navigation-tabs";
import { Ionicons } from "react-native-vector-icons";

// from app
import styles from "./styles";

/** ホームタブ */
// TODO 1Dateのロゴに変更
export const HomeTabIcon = ({ tintColor }) => (
  <Ionicons name="md-home" size={26} style={styles.icon} color={tintColor} />
);

/** 検索タブ */
export const SearchTabIcon = ({ tintColor }) => (
  <Ionicons name="md-search" size={26} style={styles.icon} color={tintColor} />
);

/** マイプランタブ */
export const MyPlanTabIcon = ({ tintColor }) => (
  <Ionicons name="md-pin" size={26} style={styles.icon} color={tintColor} />
);

/** 通知タブ */
export const NotificationTabIcon = ({ tintColor }) => (
  <Ionicons
    name="md-notifications"
    size={26}
    style={styles.icon}
    color={tintColor}
  />
);

/** プロフィールタブ */
// TODO プロフィール画像に変更
export const ProfileTabIcon = ({ tintColor }) => (
  <Ionicons name="md-person" size={26} style={styles.icon} color={tintColor} />
);

/** BottomTabBar */
export const TabBar = BottomTabBar;
