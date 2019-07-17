import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";

/**
 * ホーム画面のスタイリング
 * @author kotatanaka
 */
export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  }
});
