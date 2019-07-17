import React from "react";
import { Ionicons } from "@expo/vector-icons";

/** ホームタブ */
// TODO 1Dateのロゴに変更
export const HomeTabIcon = ({ tintColor }: { tintColor: string }) => (
  <Ionicons
    name="md-home"
    size={26}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
);

/** 検索タブ */
export const SearchTabIcon = ({ tintColor }: { tintColor: string }) => (
  <Ionicons
    name="md-search"
    size={26}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
);

/** マイプランタブ */
export const MyPlanTabIcon = ({ tintColor }: { tintColor: string }) => (
  <Ionicons
    name="md-pin"
    size={26}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
);

/** 通知タブ */
export const NotificationTabIcon = ({ tintColor }: { tintColor: string }) => (
  <Ionicons
    name="md-notifications"
    size={26}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
);

/** プロフィールタブ */
// TODO プロフィール画像に変更
export const ProfileTabIcon = ({ tintColor }: { tintColor: string }) => (
  <Ionicons
    name="md-person"
    size={26}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
);
