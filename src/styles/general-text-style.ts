import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * 汎用テキストスタイリング
 */
export const appTextStyle = StyleSheet.create({
  defaultText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  },
  standardText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14
  },
  standardLightText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 14
  },
  colorText: {
    color: Colors.tintColor,
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

export default appTextStyle;
