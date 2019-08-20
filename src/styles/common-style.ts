import { StyleSheet } from "react-native";

// from app
import Layout from "app/src/constants/Layout";
import Colors from "app/src/constants/Colors";

/**
 * 共通のスタイリング
 * @author kotatanaka
 */
const appStyle = StyleSheet.create({
  defaultContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  },
  emptySpace: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
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
  },
  countText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    textAlign: "center",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  }
});

export default appStyle;
