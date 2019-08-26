import React from "react";
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right } from 'native-base';
import { Ionicons } from "@expo/vector-icons";


const LinkedAccountScreen: React.FC = () => {

  return (
    <Container>
      <Header />
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="facebook" />
              </Button>
            </Left>
            <Body>
              <Text>FaceBook</Text>
            </Body>
            <Right>
              <switch value={false} />
            </Right>
          </ListItem>
        </Content>
        <Right>
          <Button hasText transparent>
            <Text>完了</Text>
          </Button>
        </Right>
    </Container>

  );
};

export default LinkedAccountScreen;
