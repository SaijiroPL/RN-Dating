import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * 汎用テキストスタイリング
 */
export const appTextStyle = StyleSheet.create({
  /** 通常文字 */
  defaultText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  },

  /** 通常文字(サイズ指定) */
  standardText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14
  },

  /** 細文字(サイズ指定) */
  standardLightText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 14
  },

  /** オレンジ文字 */
  tintColorText: {
    color: Colors.tintColor,
    fontFamily: "genju-medium"
  },

  /** 白文字(背景色がある場合の文字) */
  whiteText: {
    color: "white",
    fontFamily: "genju-medium"
  },

  /** 無効文字(透過文字) */
  inactiveText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    opacity: 0.4
  },

  /** 件数表示テキスト */
  countText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    textAlign: "center",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  },

  /** もっと見るリンク */
  detailLinkText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  }
});

export default appTextStyle;
