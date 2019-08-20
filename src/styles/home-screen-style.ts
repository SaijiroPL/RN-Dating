import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

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
  },
  swiper: {
    marginHorizontal: 10
  }
});

/**
 * 画像グリッドコンポーネントのスタイリング
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
