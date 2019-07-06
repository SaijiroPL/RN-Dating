import { StyleSheet, Dimensions } from "react-native";

// from app
import layout from "app/src/constants/layout";

/**
 * 初回起動時画面のスタイリング
 * @author kotatanaka
 */
export const topStyle = StyleSheet.create({
  containerStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptySpaceStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  topImageStyle: { flex: 2, justifyContent: "center", alignItems: "center" },
  linkGroupStyle: { flex: 3, justifyContent: "center", alignItems: "center" },
  inputFormStyle: {
    width: layout.window.width * 0.75,
    marginBottom: 20
  },
  completeButtonStyle: {
    backgroundColor: "orange",
    paddingVertical: 10,
    width: layout.window.width * 0.75
  },
  welcomeTextStyle: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    padding: 10
  },
  linkStyle: {
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
  sexGroupStyle: { flex: 1, flexDirection: "row", alignItems: "center" },
  ageGroupStyle: { flex: 1, flexDirection: "row", alignItems: "center" },
  addressGroupStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  dividerStyle: {
    backgroundColor: "orange",
    width: layout.window.width * 0.75,
    marginVertical: 30
  },
  entryTextStyle: {
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
  slideStyle: { flex: 1, alignItems: "center", width: layout.window.width },
  headerStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  footerStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTextStyle: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    paddingVertical: 20
  },
  titleStyle: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 20,
    padding: 10
  },
  descriptionStyle: {
    fontFamily: "genju-medium",
    color: "#666",
    fontSize: 15,
    padding: 10
  }
});
