import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  View,
  Text,
  Left,
  Right,
  Input,
  Item
} from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
import appTextStyle from "app/src/styles/GeneralTextStyle";
import { CompleteButton } from "app/src/components/Button";
import appStyle from "app/src/styles/GeneralStyle";

/**
 * よくある質問画面
 * @author itsukiyamada, kotatanaka
 */
const FaqScreen: React.FC = () => {
  const [isSelectA, setSelectA] = useState<boolean>(false);
  const [isSelectB, setSelectB] = useState<boolean>(false);
  const [isSelectC, setSelectC] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const onCompleteButtonPress = () => {
    console.log(question);
  };

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
        style={{ backgroundColor: COLOR.baseBackgroundColor }}
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
        <Header>
          <Text style={appTextStyle.standardText}>質問を送信</Text>
        </Header>
        <Item regular>
          <Input
            placeholder="質問を入力"
            onChangeText={value => setQuestion(value)}
            value={question}
          />
        </Item>
        <View style={thisStyle.item}>
          <CompleteButton title="送信" onPress={onCompleteButtonPress} />
        </View>
      </Content>
    </Container>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  item: {
    alignItems: "center",
    marginTop: 20
  }
});

export default FaqScreen;
