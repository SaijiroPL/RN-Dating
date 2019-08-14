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
  createPlanContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  createPlanFab: {
    backgroundColor: Colors.tintColor
  }
});
