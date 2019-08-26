import React from "react";
import { Container, Header, Content, List, ListItem, Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";
// from app
import profileScreenStyle from "app/src/styles/profile-screen-style";

/**
 * 設定成画面トップ
 */
const SettingTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <Container>
      <Content>
        <List>
          <ListItem itemDivider>
            <Text>アカウント</Text>
          </ListItem>
          <ListItem onPress={() => navigate("profile")}>
            <Text>プロフィール設定</Text>
          </ListItem>
          <ListItem onPress={() => navigate("account")}>
            <Text>リンク済みアカウント</Text>
          </ListItem>
          <ListItem onPress={() => navigate("pass")}>
            <Text>パスワード変更</Text>
          </ListItem>
          <ListItem onPress={() => navigate("logout")}>
            <Text>ログアウト</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>その他</Text>
          </ListItem>
          <ListItem onPress={() => navigate("faq")}>
            <Text>ヘルプセンター</Text>
          </ListItem>
          <ListItem onPress={() => navigate("privacy")}>
            <Text>プライバシーポリシー</Text>
          </ListItem>
          <ListItem onPress={() => navigate("terms")}>
            <Text>利用規約</Text>
          </ListItem>
          <ListItem onPress={() => navigate("history")}>
            <Text>検索履歴の削除</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default SettingTopScreen;
