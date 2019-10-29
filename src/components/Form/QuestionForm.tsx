import React from "react";
import { Content, Form, Textarea, View } from "native-base";
import { StyleSheet } from "react-native";

// from app
import { CompleteButton } from "app/src/components/Button";

interface Props {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  onSendButtonPress: () => void;
  errors?: Array<string>;
}

/**
 * お問い合わせフォーム
 * @author itsukiyamada, kotatanaka
 */
export const QuestionForm: React.FC<Props> = (props: Props) => {
  const { question, setQuestion, onSendButtonPress, errors } = props;

  // TODO エラーメッセージ出力

  // 正常入力
  return (
    <Content padder>
      <Form>
        <Textarea
          rowSpan={5}
          bordered
          underline
          placeholder="質問を入力してください。"
          onChangeText={value => setQuestion(value)}
          value={question}
        />
      </Form>
      <View style={thisStyle.item}>
        <CompleteButton title="送信" onPress={onSendButtonPress} />
      </View>
    </Content>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  item: {
    alignItems: "center",
    marginTop: 20
  }
});
