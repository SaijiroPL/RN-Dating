import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";
import layout from "app/src/constants/layout";

/**
 * デートプランプラン関連画面のスタイリング
 * @author kotatanaka
 */
export const planCardStyle = StyleSheet.create({
  card: {
    // borderRadius: 10
  },
  image: {
    height: 200,
    width: layout.window.width
  },
  mainText: {
    fontFamily: "genju-medium"
  },
  descriptionText: {
    fontFamily: "genju-medium",
    fontSize: 12
  }
});
