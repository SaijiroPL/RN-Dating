import { StyleSheet } from "react-native";

// from app
import Layout from "app/src/constants/Layout";

/**
 * SpotSwiperコンポーネントのスタイリング
 * @author kotatanaka
 */
export const spotSwiperStyle = StyleSheet.create({
  swiper: {
    marginHorizontal: 10
  }
});

/**
 * ImageGridコンポーネントのスタイリング
 * @author kotatanaka
 */
export const imageGridStyle = StyleSheet.create({
  box: {
    height: Layout.window.width / 2,
    justifyContent: "center",
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 1
  },
  image: {
    height: (Layout.window.width * 0.95) / 2,
    width: (Layout.window.width * 0.95) / 2
  }
});
