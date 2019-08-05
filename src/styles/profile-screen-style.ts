import { StyleSheet } from "react-native";

// from app
import colors from "app/src/constants/colors";

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
    backgroundColor: colors.tintColor
  },
  nameText: {
    color: colors.textTintColor,
    fontFamily: "genju-medium",
    marginTop: 20
  },
  countText: {
    color: colors.textTintColor,
    fontFamily: "genju-medium"
  }
});
