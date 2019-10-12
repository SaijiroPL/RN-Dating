import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

/**
 * レイアウト定数
 * @author tanakakota
 */
export const LAYOUT = {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375
};
