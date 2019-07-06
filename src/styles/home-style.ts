import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";

/**
 * ホーム画面のスタイリング
 * @author kotatanaka
 */
export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: "center"
  }
});
