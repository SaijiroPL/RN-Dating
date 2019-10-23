import React from "react";
import { StyleSheet } from "react-native";
import { Input, Item, Label, Text, View } from "native-base";

// from app
import { COLOR, LAYOUT } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  label: string;
  value?: string;
  numValue?: number;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setNumValue?: React.Dispatch<React.SetStateAction<number>>;
  errors?: Array<string>;
}

/**
 * テキスト入力フォーム(ラベル付き)
 * @author kotatanaka
 */
export const InputLabelForm: React.FC<Props> = (props: Props) => {
  const { label, value, numValue, setValue, setNumValue, errors } = props;

  // エラーメッセージ
  const ErrorList =
    errors &&
    errors.length > 0 &&
    errors.map(item => (
      <View style={thisStyle.errorTextContainter}>
        <Text style={appTextStyle.errorText}>{item}</Text>
      </View>
    ));

  /** 文字列 */
  if (
    // 空文字は許可
    value !== undefined &&
    setValue &&
    numValue === undefined &&
    !setNumValue
  ) {
    return (
      <Item inlineLabel>
        <Label style={thisStyle.labelText}>{label}</Label>
        <View style={thisStyle.inputContainer}>
          <Input
            onChangeText={value => setValue(value)}
            value={value}
            style={thisStyle.inputText}
          />
          <View />
          {ErrorList}
        </View>
      </Item>
    );
  }

  /** 数値 */
  if (
    value === undefined &&
    !setValue &&
    // 0は許可
    numValue !== undefined &&
    setNumValue
  ) {
    return (
      <Item inlineLabel>
        <Label style={thisStyle.labelText}>{label}</Label>
        <Input
          onChangeText={numValue => setNumValue(+numValue)}
          value={`${numValue}`}
          style={thisStyle.inputText}
        />
        {ErrorList}
      </Item>
    );
  }

  return <Item />;
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column"
  },
  errorTextContainter: {
    alignItems: "flex-start"
  },
  labelText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14,
    width: LAYOUT.window.width * 0.25
  },
  inputText: {
    fontFamily: "genju-light"
  }
});
