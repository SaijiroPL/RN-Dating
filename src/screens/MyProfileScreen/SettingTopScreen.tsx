import React from "react";
import { Container, Content, List, ListItem, Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * 設定画面トップ
 * @author itsukiyamada, kotatanaka
 */
const SettingTopScreen: React.FC = () => {
  const { navigate } = useNavigation();

  /**
   * リンクを描画する
   * @param name リンク表示名(設定名)
   * @param navigateKey 画面遷移のキー名
   * @return ListItem
   */
  const renderLink = (name: string, navigateKey: string) => (
    <ListItem onPress={() => navigate(navigateKey)}>
      <Text style={appTextStyle.standardText}>{name}</Text>
    </ListItem>
  );

  return (
    <Container>
      <Content>
        <List>
          <ListItem itemDivider>
            <Text style={appTextStyle.defaultText}>アカウント</Text>
          </ListItem>
          {renderLink("プロフィール設定", "profile")}
          {renderLink("リンク済みアカウント", "account")}
          {renderLink("パスワード変更", "pass")}
          {renderLink("ログアウト", "logout")}
          <ListItem itemDivider>
            <Text style={appTextStyle.defaultText}>その他</Text>
          </ListItem>
          {renderLink("ヘルプセンター", "faq")}
          {renderLink("利用規約", "terms")}
          {renderLink("プライバシーポリシー", "privacy")}
          {renderLink("検索履歴の削除", "history")}
        </List>
      </Content>
    </Container>
  );
};

export default SettingTopScreen;
