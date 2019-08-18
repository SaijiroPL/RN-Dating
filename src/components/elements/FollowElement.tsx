import React from "react";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { Follow } from "app/src/types/api/TFollow";
import Images from "app/src/constants/Images";
import { userStyle } from "app/src/styles/user-component-style";

interface Props {
  follow: Follow;
}

/**
 * フォロー/フォロワーリスト要素コンポーネント
 * @author kotatanaka
 */
const FollowElement: React.FC<Props> = ({ follow }) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate("profile", { id: follow.user_id });
  };

  return (
    <ListItem avatar onPress={onPress}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text style={userStyle.nameText}>{follow.user_name}</Text>
        <Text style={userStyle.idText}>@{follow.user_id}</Text>
        <Text note style={userStyle.dateText}>
          followd at {follow.follow_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

export default FollowElement;