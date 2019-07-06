import { StyleSheet, Dimensions } from "react-native";

// from app
import layout from "app/src/constants/layout";

/**
 * 初回起動時画面のスタイリング
 * @author kotatanaka
 */
export const topStyle = StyleSheet.create({
  topContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptySpace: { flex: 1, justifyContent: "center", alignItems: "center" },
  topImage: { flex: 2, justifyContent: "center", alignItems: "center" },
  linkGroup: { flex: 3, justifyContent: "center", alignItems: "center" },
  inputForm: {
    width: layout.window.width * 0.75,
    marginBottom: 20
  },
  completeButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    width: layout.window.width * 0.75
  },
  welcomeText: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    padding: 10
  },
  link: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "orange"
  }
});

/**
 * ユーザー情報入力画面のスタイリング
 * @author kotatanaka
 */
export const entryStyle = StyleSheet.create({
  sexGroup: { flex: 1, flexDirection: "row", alignItems: "center" },
  ageGroup: { flex: 1, flexDirection: "row", alignItems: "center" },
  addressGroup: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    backgroundColor: "orange",
    width: layout.window.width * 0.75,
    marginVertical: 30
  },
  entryText: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    textAlign: "center"
  }
});

/**
 * ウェルカム画面のスタイリング
 * @author kotatanaka
 */
export const welocomeStyle = StyleSheet.create({
  slide: { flex: 1, alignItems: "center", width: layout.window.width },
  header: { flex: 1, justifyContent: "center", alignItems: "center" },
  footer: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerText: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    paddingVertical: 20
  },
  title: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    padding: 10
  },
  description: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 15,
    padding: 10
  }
});
