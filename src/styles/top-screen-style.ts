import { StyleSheet } from "react-native";

// from app
import layout from "app/src/constants/layout";
import colors from "app/src/constants/colors";

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
    width: layout.window.width * 0.75
  },
  welcomeText: {
    color: colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10
  },
  link: {
    color: colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    textDecorationColor: colors.tintColor,
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
    color: colors.textTintColor,
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
    width: layout.window.width
  },
  footer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    color: colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10
  },
  description: {
    color: colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 15,
    padding: 10
  }
});
