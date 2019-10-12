import React from "react";
import { View } from "react-native";
import { Input, Item } from "native-base";
import { AntDesign } from "@expo/vector-icons";

// from app
import { LAYOUT } from "app/src/constants";

interface Props {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * テキスト入力フォーム
 * @author kotatanaka
 */
export const InputForm: React.FC<Props> = (props: Props) => {
  const { placeholder, value, setValue } = props;

  const NoInput = <View />;
  const SuccessMark = <AntDesign name="checkcircle" color="green" />;

  if (value === "") {
    return (
      <Item>
        <Input
          placeholder={placeholder}
          onChangeText={value => setValue(value)}
          value={value}
          style={{ width: LAYOUT.window.width * 0.75 }}
        />
        {NoInput}
      </Item>
    );
  }

  return (
    <Item success>
      <Input
        placeholder={placeholder}
        onChangeText={value => setValue(value)}
        value={value}
        style={{ width: LAYOUT.window.width * 0.75 }}
      />
      {SuccessMark}
    </Item>
  );
};
