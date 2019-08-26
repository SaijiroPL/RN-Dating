import React from "react";
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';



const EditProfileScreen: React.FC = () => {

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item inlineLabel>
            <Label>名前変更</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>ユーザーネーム</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>自己紹介変更</Label>
            <Input />
          </Item><Item inlineLabel>
            <Label>メール変更</Label>
            <Input />
          </Item><Item inlineLabel>
            <Label>性別変更</Label>
            <Input />
          </Item><Item inlineLabel>
            <Label>年齢</Label>
            <Input />
          </Item><Item inlineLabel>
            <Label>住まい</Label>
            <Input />
          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
      </Content>
      <Header>
          <Body>
            <Title>プロフィール編集</Title>
          </Body>
          <Right>
            <Button hasText transparent>
              <Text>完了</Text>
            </Button>
          </Right>
        </Header>
    </Container>
  );
};

export default EditProfileScreen;
