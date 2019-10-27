import React, { useState } from "react";
import { Container, Header, Content, Text } from "native-base";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { FaqList } from "app/src/components/List";
import { QuestionForm } from "app/src/components/Form";
import { useGetFaqList } from "app/src/hooks";
import { appTextStyle } from "app/src/styles";

/**
 * よくある質問画面
 * @author itsukiyamada, kotatanaka
 */
const FaqScreen: React.FC = () => {
  /** よくある質問一覧取得 */
  const { isLoading, faqList, errors } = useGetFaqList();

  /** 質問投稿内容 */
  const [question, setQuestion] = useState<string>("");

  /** 質問送信ボタン押下時の処理 */
  const onSendButtonPress = () => {
    // TODO 質問投稿
    console.log(question);
  };

  /** ローディング */
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <Container>
      <Header>
        <Text style={appTextStyle.standardText}>よくある質問</Text>
      </Header>
      <Content>
        <FaqList faqList={faqList} />
        <Header>
          <Text style={appTextStyle.standardText}>お問い合わせ</Text>
        </Header>
        <QuestionForm
          question={question}
          setQuestion={setQuestion}
          onSendButtonPress={onSendButtonPress}
        />
      </Content>
    </Container>
  );
};

export default FaqScreen;
