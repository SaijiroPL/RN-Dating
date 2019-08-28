import React from "react";
import { Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// from app
import Images from "app/src/constants/Images";

interface Props {
  tintColor: string;
}

/** ホームタブ */
// TODO 1Dateのロゴに変更
export const HomeTabIcon = (props: Props) => (
  <Image source={Images.logo} fadeDuration={0} style={style.logo} />
);

/** 検索タブ */
export const SearchTabIcon = (props: Props) => (
  <Ionicons
    name="md-search"
    size={26}
    style={style.icon}
    color={props.tintColor}
  />
);

/** マイプランタブ */
export const MyPlanTabIcon = (props: Props) => (
  <Ionicons
    name="md-pin"
    size={26}
    style={style.icon}
    color={props.tintColor}
  />
);

/** 通知タブ */
export const NotificationTabIcon = (props: Props) => (
  <Ionicons
    name="md-notifications"
    size={26}
    style={style.icon}
    color={props.tintColor}
  />
);

/** プロフィールタブ */
// TODO プロフィール画像に変更
export const ProfileTabIcon = (props: Props) => (
  <Ionicons
    name="md-person"
    size={26}
    style={style.icon}
    color={props.tintColor}
  />
);

/** スタイリング */
const style = StyleSheet.create({
  icon: {
    marginBottom: -3
  },
  logo: {
    height: 20,
    width: 20
  }
});
