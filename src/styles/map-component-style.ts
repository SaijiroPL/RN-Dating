import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * SimpleMapViewコンポーネントのスタイリング
 * @author kotatanaka
 */
export const simpleMapViewStyle = StyleSheet.create({
  map: {
    borderColor: Colors.inactiveColor,
    borderRadius: 10,
    borderWidth: 1,
    height: 200,
    margin: 10
  }
});
