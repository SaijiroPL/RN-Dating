import React from "react";
import { Content, Form, Textarea, View, Item, Label } from "native-base";
import { StyleSheet } from "react-native";
import { COLOR, LAYOUT } from "app/src/constants";

interface Props {
  label: string;
  value?: string;
  numValue?: number;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setNumValue?: React.Dispatch<React.SetStateAction<number>>;
  errors?: Array<string>;
}

/**
 * 自己紹介編集フォーム
 * @author itsukiyamada, kotatanaka
 */
export const profileForm: React.FC<Props> = (props: Props) => {
  const { label, value, numValue, setValue, setNumValue, errors } = props;

  // TODO エラーメッセージ出力

  /** 文字列 */
  if (
    // 空文字は許可
    value !== undefined &&
    setValue &&
    numValue === undefined &&
    !setNumValue
  ) {
    // 正常入力
    return (
      <Item inlineLabel>
        <Label style={thisStyle.labelText}>{label}</Label>
        <Content padder>
          <Form>
            <Textarea
              rowSpan={5}
              bordered
              underline
              placeholder="自己紹介"
              onChangeText={value => setValue(value)}
              value={value}
            />
          </Form>
        </Content>
      </Item>
    );
  }
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  labelText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14,
    width: LAYOUT.window.width * 0.25
  }
});
