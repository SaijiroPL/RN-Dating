import React from "react";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import appStyle, { appTextStyle } from "app/src/styles/general-style";

import { Container, Content, Form, Item, Input, Label } from "native-base";

/**
 * パスワード変更画面
 * @author itsukiyamada
 */
const ChangePasswordScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const onCompleteButtonPress = () => {
    navigate("top");
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>現在のパスワード</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>新しいパスワード</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>新しいパスワードの確認</Label>
            <Input />
          </Item>
          <View style={appStyle.standardContainer}>
            <CompleteButton title="完了" onPress={onCompleteButtonPress} />
          </View>
        </Form>
      </Content>
    </Container>
  );
};

export default ChangePasswordScreen;
