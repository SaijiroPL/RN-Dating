import React from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

const FaqScreen: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <List>
          <ListItem noIndent style={{ backgroundColor: "#cde1f9" }}>
            <Left>
              <Text>質問A</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>質問B</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>質問C</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default FaqScreen;
