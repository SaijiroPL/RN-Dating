import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * ホーム画面のスタイリング
 * @author kotatanaka
 */
export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  },
  createPlanFab: {
    backgroundColor: Colors.tintColor
  }
});

/**
 * プラン作成画面のスタイリング
 * @author kotatanaka
 */
export const createPlanStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  selectButtonInactive: {
    marginHorizontal: 5
  },
  selectButtonActive: {
    backgroundColor: Colors.tintColor,
    marginHorizontal: 5
  },
  selectButtonInactiveText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  },
  selectButtonActiveText: {
    color: "white",
    fontFamily: "genju-medium"
  },
  itemTitleText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    marginRight: 10
  }
});
