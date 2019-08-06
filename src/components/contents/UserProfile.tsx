import React from "react";
import { View } from "react-native";
import { Thumbnail, Text } from "native-base";

// from app
import { UserDetail } from "app/src/types/api/TUser";
import Images from "app/src/constants/Images";
import { profileStyle } from "app/src/styles/profile-screen-style";

interface Props {
  user: UserDetail;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <View style={profileStyle.userContainer}>
      <Thumbnail large source={Images.noUserImage} />
      <Text style={profileStyle.nameText}>{user.name}</Text>
      <Text note style={profileStyle.nameText}>
        {user.user_id}
      </Text>
      <View style={profileStyle.followCounts}>
        <View style={profileStyle.followCountItem}>
          <Text style={profileStyle.countText}>フォロー</Text>
          <Text style={profileStyle.countText}>{user.follow_count}</Text>
        </View>
        <View style={profileStyle.followCountItem}>
          <Text style={profileStyle.countText}>フォロワー</Text>
          <Text style={profileStyle.countText}>{user.follower_count}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
