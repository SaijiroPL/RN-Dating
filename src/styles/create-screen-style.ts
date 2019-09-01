import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * プラン作成画面のスタイリング
 * @author kotatanaka
 */
export const createPlanTopScreenStyle = StyleSheet.create({
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  itemTitleText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    marginRight: 10
  }
});

/**
 * マップからスポット範囲指定画面のスタイリング
 * @author kotatanaka
 */
export const searchMapScreenStyle = StyleSheet.create({
  mapView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

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
