import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * ユーザー一覧画面のスタイリング
 * @author kotatanaka
 */
export const userStyle = StyleSheet.create({
  nameText: {
    fontFamily: "genju-medium"
  },
  idText: {
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});
