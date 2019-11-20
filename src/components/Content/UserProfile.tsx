import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { COLOR, IMAGE } from "app/src/constants";
import { IUserDetail } from "app/src/interfaces/api/User";
import { ImagePickerButton } from "app/src/components/Button";
import { appTextStyle } from "app/src/styles";

interface Props {
  user: IUserDetail;
  me?: boolean;
  image?: any;
  pickImage?: () => Promise<void>;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
export const UserProfile: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user, me, image, pickImage } = props;

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
      <Thumbnail large source={image ? { uri: image } : IMAGE.noUserImage} />
      {me && pickImage && <ImagePickerButton pickImage={pickImage} />}
      <View style={thisStyle.userInfoContainer}>
        <Text style={thisStyle.nameText}>{user.name}</Text>
        <Text note style={thisStyle.nameText}>
          @{user.user_id}
        </Text>
      </View>
      <View style={thisStyle.countContainer}>
        <View style={thisStyle.countItem}>
          <Text style={thisStyle.countTitleText}>プラン数</Text>
          <Text style={appTextStyle.countText} onPress={onPlanPress}>
            {user.plan_count}
          </Text>
        </View>
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
    alignItems: "center",
    marginTop: 20
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  countContainer: {
    alignContent: "space-around",
    flexDirection: "row"
  },
  countItem: {
    alignItems: "center",
    flexDirection: "column",
    margin: 10
  },
  nameText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    marginTop: 5
  },
  countTitleText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-light",
    fontSize: 15
  }
});
