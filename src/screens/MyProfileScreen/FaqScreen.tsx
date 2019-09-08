import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

// from app
import Colors from "app/src/constants/Colors";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * よくある質問画面
 * @author itsukiyamada, kotatanaka
 */
const FaqScreen: React.FC = () => {
  const [isSelectA, setSelectA] = useState<boolean>(false);
  const [isSelectB, setSelectB] = useState<boolean>(false);
  const [isSelectC, setSelectC] = useState<boolean>(false);

  /**
   * 質問項目を描画する
   * @param question 質問
   * @param isSelect 選択されているかどうか
   * @param setSelect 選択状態を切り替える関数
   */
  const renderListItem = (
    question: string,
    isSelect: boolean,
    setSelect: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const Question = <Text style={appTextStyle.standardText}>{question}</Text>;
    const ArrowForward = <Ionicons name="ios-arrow-forward" size={20} />;

    // TODO 質問を選択したら展開されて回答を表示する

    // 選択中の場合は背景色を変える
    return isSelect ? (
      <ListItem
        noIndent
        style={{ backgroundColor: Colors.baseBackgroundColor }}
        onPress={() => setSelect(!isSelect)}
      >
        <Left>{Question}</Left>
        <Right>{ArrowForward}</Right>
      </ListItem>
    ) : (
      <ListItem noIndent onPress={() => setSelect(!isSelect)}>
        <Left>{Question}</Left>
        <Right>{ArrowForward}</Right>
      </ListItem>
    );
  };

  return (
    <Container>
      <Header>
        <Text style={appTextStyle.standardText}>よくある質問</Text>
      </Header>
      <Content>
        <List>
          {renderListItem("質問A", isSelectA, setSelectA)}
          {renderListItem("質問B", isSelectB, setSelectB)}
          {renderListItem("質問C", isSelectC, setSelectC)}
        </List>
      </Content>
    </Container>
  );
};

export default FaqScreen;
