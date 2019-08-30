import React from "react";
import {
  Container,
  Content,
  Button,
  ListItem,
  /**
   * Switch,
   */
  Text,
  Left,
  Body,
  Right
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

/**
   * export default class App extends Component {
  state = {
    switching: false
  }

    switchValue = (value) => {
      this.setState({ switching: value });
      const switchText = value ? 'ON' : 'OFF';
    }
   */

const LinkedAccountScreen: React.FC = () => {
  /**
   * アカウントリンクボタンの実装
   * @author itsukiyamada
   */

  return (
    <Container>
      <Content>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Ionicons active name="facebook" />
            </Button>
          </Left>
          <Body>
            <Text>FaceBook</Text>
          </Body>
          <Right>
            //** *<Switch onValueChange={this.switchValue} value={switching} />
            *//
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default LinkedAccountScreen;
