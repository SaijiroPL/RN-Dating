import React from "react";
import { Input, Item, Label } from "native-base";

// from app
import Layout from "app/src/constants/Layout";

interface Props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 入力中にラベルが浮く入力フォーム
 * @author kotatanaka
 */
export const InputFormFloating: React.FC<Props> = (props: Props) => {
  const { label, value, setValue } = props;

  if (value === "") {
    return (
      <Item floatingLabel style={{ width: Layout.window.width * 0.9 }}>
        <Label>{label}</Label>
        <Input onChangeText={value => setValue(value)} value={value} />
      </Item>
    );
  }

  return (
    <Item floatingLabel success style={{ width: Layout.window.width * 0.9 }}>
      <Label>{label}</Label>
      <Input onChangeText={value => setValue(value)} value={value} />
    </Item>
  );
};
