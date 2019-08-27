import { StyleSheet } from "react-native";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

/**
 * PlanCardコンポーネントのスタイリング
 * @author kotatanaka
 */
export const planCardStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  image: {
    flex: 1,
    height: 150
  },
  map: {
    flex: 1,
    height: 150
  },
  mainText: {
    fontFamily: "genju-medium"
  },
  descriptionText: {
    fontFamily: "genju-light",
    fontSize: 12
  },
  linkButtonGroup: {
    backgroundColor: Colors.baseBackgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  linkButtonText: {
    color: Colors.tintColor
  },
  linkButton: {
    flex: 1,
    justifyContent: "center"
  }
});

/**
 * FollowElement,LikeUserElementコンポーネントのスタイリング
 * @author kotatanaka
 */
export const userElementStyle = StyleSheet.create({
  nameText: {
    fontFamily: "genju-medium"
  },
  idText: {
    fontFamily: "genju-light",
    fontSize: 10,
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});

/**
 * CommentElementコンポーネントのスタイリング
 * @author kotatanaka
 */
export const commentElementStyle = StyleSheet.create({
  nameText: {
    fontFamily: "genju-medium",
    textDecorationColor: Colors.inactiveColor,
    textDecorationLine: "underline"
  },
  commentText: {
    fontFamily: "genju-light"
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 10
  }
});

/**
 * ImageCarouselコンポーネントのスタイリング
 * @author kotatanaka
 */
export const imageCarouselStyle = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 5
  },
  slide: {
    // flex: 1,
    height: Layout.window.height * 0.23,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  image: {
    flex: 1,
    width: Layout.window.width * 0.8
  }
});

/**
 * CommentGridコンポーネントのスタイリング
 * @author kotatanaka
 */
export const commentGridStyle = StyleSheet.create({
  container: {
    margin: 5
  },
  item: {
    // borderBottomWidth: 1,
    borderColor: "#eee",
    borderTopWidth: 1,
    flexDirection: "row",
    margin: 5
  },
  thumbnail: {
    padding: 5
  },
  comment: {
    padding: 5
  },
  nameText: {
    fontFamily: "genju-light",
    fontSize: 8,
    textDecorationLine: "underline"
  },
  commentText: {
    fontFamily: "genju-light",
    fontSize: 8
  },
  dateText: {
    fontFamily: "genju-light",
    fontSize: 8
  }
});

/**
 * UserHeaderコンポーネントのスタイリング
 * @author kotatanaka
 */
export const userHeaderStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5
  },
  thumbnail: {
    padding: 5
  },
  user: {
    padding: 5
  },
  nameText: {
    fontFamily: "genju-medium"
  },
  attrText: {
    fontFamily: "genju-light"
  }
});
