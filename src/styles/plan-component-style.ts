import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * デートプラン関連画面のスタイリング
 * @author kotatanaka
 */
export const planCardStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  image: {
    flex: 1,
    height: 150
  },
  map: {
    flex: 1,
    height: 150
  },
  mainText: {
    fontFamily: "genju-medium"
  },
  descriptionText: {
    fontFamily: "genju-medium",
    fontSize: 12
  },
  linkButtonGroup: {
    backgroundColor: Colors.baseBackgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  linkButtonText: {
    color: Colors.tintColor
  },
  linkButton: {
    flex: 1,
    justifyContent: "center"
  },
  linkIcon: {
    // marginRight: 0
  }
});
