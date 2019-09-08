import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * UserProfileコンポーネントのスタイリング
 * @author kotatanaka
 */
export const userProfileStyle = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 30
  },
  countContainer: {
    alignContent: "space-around",
    flexDirection: "row"
  },
  countItem: {
    alignItems: "center",
    flexDirection: "column",
    margin: 30
  },
  nameText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    marginTop: 20
  },
  countTitleText: {
    color: Colors.textTintColor,
    fontFamily: "genju-light",
    fontSize: 15
  }
});
