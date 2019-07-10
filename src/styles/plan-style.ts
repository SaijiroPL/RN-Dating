import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";
import layout from "app/src/constants/layout";

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
    backgroundColor: colors.baseBackgroundColor
  },
  linkButtonText: {
    color: colors.tintColor
  },
  linkButton: {
    flex: 1,
    justifyContent: "center"
  },
  linkIcon: {
    // marginRight: 0
  }
});
