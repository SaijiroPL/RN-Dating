import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * コメント画面のスタイリング
 * @author kotatanaka
 */
export const commentStyle = StyleSheet.create({
  nameText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  commentText: {
    fontFamily: "genju-light"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});
