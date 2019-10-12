import { StyleSheet } from "react-native";

// from app
import { COLOR } from "app/src/constants";

/**
 * 汎用テキストスタイリング
 */
export const appTextStyle = StyleSheet.create({
  /** 通常文字 */
  defaultText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium"
  },

  /** 通常文字(サイズ指定) */
  standardText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14
  },

  /** 細文字(サイズ指定) */
  standardLightText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 14
  },

  /** オレンジ文字 */
  tintColorText: {
    color: COLOR.tintColor,
    fontFamily: "genju-medium"
  },

  /** 白文字(背景色がある場合の文字) */
  whiteText: {
    color: "white",
    fontFamily: "genju-medium"
  },

  /** 無効文字(透過文字) */
  inactiveText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    opacity: 0.4
  },

  /** 件数表示テキスト */
  countText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    textAlign: "center",
    textDecorationColor: COLOR.tintColor,
    textDecorationLine: "underline"
  },

  /** もっと見るリンク */
  detailLinkText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: COLOR.tintColor,
    textDecorationLine: "underline"
  }
});

export default appTextStyle;
