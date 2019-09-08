import React from "react";
import { Container, Content, Form, Item, Input, Label } from "native-base";

// from app
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * プロフィール編集画面
 * @author itsukiyamada
 */
const EditProfileScreen: React.FC = () => {
  return (
    <Container>
      <Content>
        <Form>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>名前変更</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>ユーザーネーム</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>自己紹介変更</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>メール変更</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>性別変更</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>年齢</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>住まい</Label>
            <Input />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default EditProfileScreen;
