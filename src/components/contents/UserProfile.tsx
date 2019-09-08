import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { IUserDetail } from "app/src/interfaces/api/User";
import Colors from "app/src/constants/Colors";
import Images from "app/src/constants/Images";
import { appTextStyle } from "app/src/styles/general-style";

interface Props {
  user: IUserDetail;
  me?: boolean;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
const UserProfile: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user, me } = props;

  const onFollowPress = () => {
    navigate(me ? "myFollow" : "follow", { id: user.user_id });
  };

  const onFollowerPress = () => {
    navigate(me ? "myFollower" : "follower", { id: user.user_id });
  };

  const onPlanPress = () => {
    navigate("MyPlanTab");
  };

  return (
    <View style={thisStyle.container}>
      <Thumbnail large source={Images.noUserImage} />
      <View style={thisStyle.userInfoContainer}>
        <Text style={thisStyle.nameText}>{user.name}</Text>
        <Text note style={thisStyle.nameText}>
          @{user.user_id}
        </Text>
      </View>
      <View style={thisStyle.countContainer}>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>フォロー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowPress}>
            {user.follow_count}
          </Text>
        </View>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>フォロワー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowerPress}>
            {user.follower_count}
          </Text>
        </View>
      </View>
      <View style={thisStyle.countContainer}>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>プラン数</Text>
          <Text style={appTextStyle.countText} onPress={onPlanPress}>
            {user.plan_count}
          </Text>
        </View>
      </View>
    </View>
  );
};

/** デフォルト値 */
UserProfile.defaultProps = {
  me: false
};

/** スタイリング */
const thisStyle = StyleSheet.create({
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

export default UserProfile;
