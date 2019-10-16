import React from "react";
import { StyleSheet } from "react-native";
import { Input, Item, Label } from "native-base";

// from app
import { COLOR, LAYOUT } from "app/src/constants";

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
  if (
    // 空文字は許可
    value !== undefined &&
    setValue &&
    numValue === undefined &&
    !setNumValue
  ) {
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
  if (
    value === undefined &&
    !setValue &&
    // 0は許可
    numValue !== undefined &&
    setNumValue
  ) {
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
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 14,
    width: LAYOUT.window.width * 0.25
  },
  input: {
    fontFamily: "genju-light"
  }
});
