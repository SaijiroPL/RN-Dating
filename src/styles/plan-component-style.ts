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
    // borderRadius: 10
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
    backgroundColor: Colors.baseBackgroundColor
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
