import React, { useState } from "react";
import {
  Container,
  Content,
  ListItem,
  Switch,
  Text,
  Left,
  Body,
  Right
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

// from app
import Colors from "app/src/constants/Colors";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * リンク済みアカウント画面
 * @author itsukiyamada, kotatanaka
 */
const LinkedAccountScreen: React.FC = () => {
  const [facebookOn, setFacebookOn] = useState<boolean>(false);

  const switchFacebookValue = (value: boolean) => {
    setFacebookOn(value);
  };

  return (
    <Container>
      <Content>
        <ListItem icon>
          <Left>
            <Ionicons
              name="logo-facebook"
              size={30}
              color={Colors.facebookColor}
            />
          </Left>
          <Body>
            <Text style={appTextStyle.standardText}>Facebook</Text>
          </Body>
          <Right>
            <Switch onValueChange={switchFacebookValue} value={facebookOn} />
          </Right>
        </ListItem>
      </Content>
    </Container>
  );
};

export default LinkedAccountScreen;
