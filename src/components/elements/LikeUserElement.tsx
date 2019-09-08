import React from "react";
import { ListItem, Thumbnail, Text, Left, Body } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { ILikeUser } from "app/src/interfaces/api/Like";
import Images from "app/src/constants/Images";
import { userElementStyle } from "app/src/styles/common-component-style";

interface Props {
  user: ILikeUser;
}

/**
 * デートプランお気に入り登録者リスト要素コンポーネント
 * @author kotatanaka
 */
const LikeUserElement: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user } = props;

  const onPress = () => {
    navigate("profile", { id: user.user_id });
  };

  return (
    <ListItem avatar onPress={onPress} style={userElementStyle.container}>
      <Left>
        <Thumbnail source={Images.noUserImage} />
      </Left>
      <Body>
        <Text style={userElementStyle.nameText}>{user.user_name}</Text>
        <Text style={userElementStyle.idText}>@{user.user_id}</Text>
      </Body>
    </ListItem>
  );
};

export default LikeUserElement;
