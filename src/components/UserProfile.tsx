import React, { FC } from "react";
import { Content, Thumbnail, Text } from "native-base";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

// from app
import { UserDetail } from "app/src/constants/interfaces";
import images from "app/src/constants/images";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  user: UserDetail;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
const UserProfile: FC<Props> = ({ navigation, user }) => {
  return (
    <Content>
      <Thumbnail square large source={images.noUserImage} />
      <Text>{user.name}</Text>
      <Text note>{user.user_id}</Text>
    </Content>
  );
};

export default UserProfile;
