import React from "react";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";

// from app
import { Follow } from "app/src/types/api/TFollow";
import Images from "app/src/constants/Images";
import { followStyle } from "app/src/styles/follow-component-style";

interface Props {
  follow: Follow;
}

/**
 * フォロー/フォロワーリスト要素コンポーネント
 * @author kotatanaka
 */
const FollowElement: React.FC<Props> = ({ follow }) => {
  return (
    <ListItem avatar>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text style={followStyle.nameText}>{follow.user_name}</Text>
        <Text style={followStyle.idText}>@{follow.user_id}</Text>
        <Text note style={followStyle.dateText}>
          followd at {follow.follow_date.substr(0, 10)}
        </Text>
      </Body>
    </ListItem>
  );
};

export default FollowElement;
