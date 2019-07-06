import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";

/**
 * 共通のスタイリング
 * @author kotatanaka
 */
const appStyle = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center"
  },
  defaultText: {
    fontFamily: "genju-medium",
    color: colors.textTintColor
  }
});

export default appStyle;
