import { StyleSheet } from "react-native";

// from app
import Layout from "app/src/constants/Layout";
import Colors from "app/src/constants/Colors";

/**
 * 汎用ビュースタイリング
 */
const appStyle = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  standardContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  emptySpace: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default appStyle;

/**
 * 汎用テキストスタイリング
 */
export const appTextStyle = StyleSheet.create({
  defaultText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  },
  inactiveText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    opacity: 0.4
  },
  whiteText: {
    color: "white",
    fontFamily: "genju-medium"
  },
  countText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    textAlign: "center",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  },
  detailLinkText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  }
});

/**
 * 汎用ボタンスタイル
 */
export const appButtonStyle = StyleSheet.create({
  completeButton: {
    backgroundColor: Colors.tintColor,
    width: Layout.window.width * 0.75
  },
  touchableFooter: {
    backgroundColor: Colors.tintColor
  },
  disTouchableFooter: {
    backgroundColor: Colors.baseBackgroundColor
  },
  completeFooterButton: {
    justifyContent: "center",
    width: Layout.window.width
  }
});
