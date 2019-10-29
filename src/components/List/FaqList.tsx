import React, { useState } from "react";
import { Body, List, ListItem, Text, Left, Right, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";
import { IFaq } from "app/src/interfaces/api/Question";
import { appTextStyle } from "app/src/styles";

interface Props {
  faqList: Array<IFaq>;
}

/**
 * FAQリストコンポーネント
 * @author kotatanaka
 */
export const FaqList: React.FC<Props> = (props: Props) => {
  /** FAQリストデータ */
  const { faqList } = props;

  /** 選択中の質問のインデックス */
  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number>();

  /** 質問右端の矢印 */
  const ArrowForward = <Ionicons name="ios-arrow-forward" size={20} />;

  /**
   * 回答項目の描画
   * @param answer 回答
   */
  const renderAnswer = (answer: string) => {
    return (
      <Body>
        <Text style={appTextStyle.standardLightText}>{answer}</Text>
      </Body>
    );
  };

  /**
   * 質問項目の描画
   * @param faq FAQデータ
   */
  const renderQuestion = (faq: IFaq) => {
    /** 質問テキスト */
    const Question = (
      <Text style={appTextStyle.standardText}>{faq.question}</Text>
    );

    /** 選択中の質問は回答を展開する */
    if (selectedFaqIndex === faq.question_id) {
      return (
        <View>
          <ListItem
            noIndent
            style={{ backgroundColor: COLOR.baseBackgroundColor }}
            onPress={() => setSelectedFaqIndex(faq.question_id)}
          >
            <Left>{Question}</Left>
            <Right>{ArrowForward}</Right>
          </ListItem>
          <ListItem>{renderAnswer(faq.answer)}</ListItem>
        </View>
      );
    }

    return (
      <View>
        <ListItem noIndent onPress={() => setSelectedFaqIndex(faq.question_id)}>
          <Left>{Question}</Left>
          <Right>{ArrowForward}</Right>
        </ListItem>
      </View>
    );
  };

  return <List>{faqList.map(faq => renderQuestion(faq))}</List>;
};
