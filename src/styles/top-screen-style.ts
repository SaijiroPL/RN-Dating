import { StyleSheet } from "react-native";

// from app
import Layout from "app/src/constants/Layout";
import Colors from "app/src/constants/Colors";

/**
 * 初回起動時画面のスタイリング
 * @author kotatanaka
 */
export const topStyle = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  emptySpace: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  topImage: {
    alignItems: "center",
    flex: 2,
    justifyContent: "center"
  },
  linkGroup: {
    alignItems: "center",
    flex: 3,
    justifyContent: "center"
  },
  inputForm: {
    marginBottom: 20,
    width: Layout.window.width * 0.75
  },
  welcomeText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10
  },
  link: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  }
});

/**
 * ユーザー情報入力画面のスタイリング
 * @author kotatanaka
 */
export const entryStyle = StyleSheet.create({
  sexGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  ageGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  addressGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  entryText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    textAlign: "center"
  }
});

/**
 * ウェルカム画面のスタイリング
 * @author kotatanaka
 */
export const welocomeStyle = StyleSheet.create({
  slide: {
    alignItems: "center",
    flex: 1,
    width: Layout.window.width
  },
  footer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10
  },
  description: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 15,
    padding: 10
  }
});
