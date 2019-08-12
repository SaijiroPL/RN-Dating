import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";

/**
 * 検索画面のスタイリング
 * @author kotatanaka
 */
export const searchStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor
  },
  searchBar: {
    backgroundColor: "white",
    shadowColor: "#ccc",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  searchInput: {
    backgroundColor: "#eee"
  },
  planCount: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});
