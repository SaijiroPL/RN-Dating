import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * ホーム画面のスタイリング
 * @author kotatanaka
 */
export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  },
  createPlanFab: {
    backgroundColor: Colors.tintColor
  },
  planCountText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    textAlign: "center",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  }
});
