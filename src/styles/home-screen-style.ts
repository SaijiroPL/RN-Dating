import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * ホーム画面のスタイリング
 * @author kotatanaka
 */
const homeScreenStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  },
  createPlanFab: {
    backgroundColor: Colors.tintColor
  }
});

export default homeScreenStyle;
