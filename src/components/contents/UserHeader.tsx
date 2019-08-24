import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Thumbnail, Text } from "native-base";

// from app
import { User } from "app/src/types/api/TUser";
import Images from "app/src/constants/Images";
import { userHeaderStyle } from "app/src/styles/common-component-style";

interface Props {
  user: User;
}

/**
 * ユーザーヘッダーコンポーネント
 * @author kotatanaka
 */
const UserHeader: React.FC<Props> = (props: Props) => {
  const { navigate } = useNavigation();
  const { user } = props;

  const onPress = () => {
    navigate("profile", { id: user.userId });
  };

  return (
    <View style={userHeaderStyle.container}>
      <View style={userHeaderStyle.thumbnail}>
        <Thumbnail source={Images.noUserImage} />
      </View>
      <View style={userHeaderStyle.user}>
        <Text style={userHeaderStyle.nameText} onPress={onPress}>
          {user.userName}
        </Text>
        <Text note style={userHeaderStyle.attrText}>
          {user.userAttr}
        </Text>
      </View>
    </View>
  );
};

export default UserHeader;
