import React from "react";
import { StyleSheet } from "react-native";
import { Input, Item, Label } from "native-base";

// from app
import Colors from "app/src/constants/Colors";
import Layout from "app/src/constants/Layout";

interface Props {
  label: string;
  value?: string;
  numValue?: number;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  setNumValue?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * テキスト入力フォーム(ラベル付き)
 * @author kotatanaka
 */
export const InputLabelForm: React.FC<Props> = (props: Props) => {
  const { label, value, numValue, setValue, setNumValue } = props;

  /** 文字列 */
  if (value && setValue && !numValue && !setNumValue) {
    return (
      <Item inlineLabel>
        <Label style={thisStyle.label}>{label}</Label>
        <Input
          onChangeText={value => setValue(value)}
          value={value}
          style={thisStyle.input}
        />
      </Item>
    );
  }

  /** 数値 */
  if (!value && !setValue && numValue && setNumValue) {
    return (
      <Item inlineLabel>
        <Label style={thisStyle.label}>{label}</Label>
        <Input
          onChangeText={numValue => setNumValue(+numValue)}
          value={`${numValue}`}
          style={thisStyle.input}
        />
      </Item>
    );
  }

  return <Item />;
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  label: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14,
    width: Layout.window.width * 0.25
  },
  input: {
    fontFamily: "genju-light"
  }
});
