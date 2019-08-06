import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * プロフィール一覧画面のスタイリング
 * @author kotatanaka
 */
export const profileStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  userContainer: {
    alignItems: "center"
  },
  followCounts: {
    alignContent: "space-around",
    flexDirection: "row",
    marginTop: 30
  },
  followCountItem: {
    alignItems: "center",
    flexDirection: "column",
    margin: 30
  },
  settingFab: {
    backgroundColor: Colors.tintColor
  },
  nameText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    marginTop: 20
  },
  countText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  }
});
