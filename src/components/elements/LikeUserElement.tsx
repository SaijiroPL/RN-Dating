import React from "react";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { LikeUser } from "app/src/types/api/TLike";
import Images from "app/src/constants/Images";
import { userStyle } from "app/src/styles/user-component-style";

interface Props {
  user: LikeUser;
}

/**
 * デートプランお気に入り登録者リスト要素コンポーネント
 * @author kotatanaka
 */
const LikeUserElement: React.FC<Props> = ({ user }) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate("profile", { id: user.user_id });
  };

  return (
    <ListItem avatar onPress={onPress}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text style={userStyle.nameText}>{user.user_name}</Text>
        <Text style={userStyle.idText}>@{user.user_id}</Text>
      </Body>
    </ListItem>
  );
};

export default LikeUserElement;