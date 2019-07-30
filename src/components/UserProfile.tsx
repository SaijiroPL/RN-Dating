import React from "react";
import { Content, Thumbnail, Text } from "native-base";

// from app
import { UserDetail } from "app/src/constants/interfaces";
import images from "app/src/constants/images";

interface Props {
  user: UserDetail;
}

/**
 * ユーザー情報コンポーネント
 * @author kotatanaka
 */
const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <Content>
      <Thumbnail square large source={images.noUserImage} />
      <Text>{user.name}</Text>
      <Text note>{user.user_id}</Text>
    </Content>
  );
};

export default UserProfile;
