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

/**
 * デートプラン詳細画面のスタイリング
 * @author kotatanaka
 */
export const planDetailScreenStyle = StyleSheet.create({
  planDescriptionContainer: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  route: {
    alignItems: "flex-end",
    backgroundColor: Colors.baseBackgroundColor,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  title: {
    marginLeft: 10
  },
  detail: {
    marginLeft: 10
  },
  titleText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  },
  columnTitle: {
    backgroundColor: Colors.tintColor,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 2,
    paddingHorizontal: 5
  },
  columnTitleText: {
    color: "white",
    fontFamily: "genju-medium",
    fontSize: 10
  },
  description: {
    marginTop: 2
  },
  descriptionText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
  }
});
