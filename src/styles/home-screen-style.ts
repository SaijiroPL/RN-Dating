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
  titleAndRoute: {
    flexDirection: "row"
  },
  route: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    marginLeft: 10
  },
  description: {
    marginLeft: 10
  },
  titleText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.tintColor,
    textDecorationLine: "underline"
  },
  descriptionText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 10
  }
});
