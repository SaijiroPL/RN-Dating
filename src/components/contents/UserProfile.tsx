import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { UserDetail } from "app/src/types/api/TUser";
import Images from "app/src/constants/Images";
import { appTextStyle } from "app/src/styles/general-style";
import { userProfileStyle } from "app/src/styles/profile-screen-style";

interface Props {
  user: UserDetail;
  me?: boolean;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
const UserProfile: React.FC<Props> = ({ user, me }) => {
  const { navigate } = useNavigation();

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
    <View style={userProfileStyle.container}>
      <Thumbnail large source={Images.noUserImage} />
      <View style={userProfileStyle.userInfoContainer}>
        <Text style={userProfileStyle.nameText}>{user.name}</Text>
        <Text note style={userProfileStyle.nameText}>
          @{user.user_id}
        </Text>
      </View>
      <View style={userProfileStyle.countContainer}>
        <View style={userProfileStyle.countItem}>
          <Text style={userProfileStyle.countTitleText}>フォロー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowPress}>
            {user.follow_count}
          </Text>
        </View>
        <View style={userProfileStyle.countItem}>
          <Text style={userProfileStyle.countTitleText}>フォロワー</Text>
          <Text style={appTextStyle.countText} onPress={onFollowerPress}>
            {user.follower_count}
          </Text>
        </View>
      </View>
      <View style={userProfileStyle.countContainer}>
        <View style={userProfileStyle.countItem}>
          <Text style={userProfileStyle.countTitleText}>プラン数</Text>
          <Text style={appTextStyle.countText} onPress={onPlanPress}>
            {user.plan_count}
          </Text>
        </View>
      </View>
    </View>
  );
};

UserProfile.defaultProps = {
  me: false
};

export default UserProfile;
