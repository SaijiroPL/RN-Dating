import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";

/**
 * 共通のスタイリング
 * @author kotatanaka
 */
const appStyle = StyleSheet.create({
  defaultContainer: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  },
  defaultText: {
    color: colors.textTintColor,
    fontFamily: "genju-medium"
  }
});

export default appStyle;
