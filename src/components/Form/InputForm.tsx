import React from "react";
import { Input, Item, Text, View } from "native-base";
import { AntDesign } from "@expo/vector-icons";

// from app
import { LAYOUT } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errors?: Array<string>;
}

/**
 * テキスト入力フォーム
 * @author kotatanaka
 */
export const InputForm: React.FC<Props> = (props: Props) => {
  const { placeholder, value, setValue, errors } = props;

  const NoInput = <View />;
  const SuccessMark = <AntDesign name="checkcircle" color="green" />;
  const ErrorMark = <AntDesign name="closecircle" color="red" />;

  // 未入力
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

  // 異常入力
  if (errors && errors.length > 0) {
    const ErrorList = errors.map(item => (
      <Text style={appTextStyle.errorText}>{item}</Text>
    ));

    return (
      <View>
        <Item error>
          <Input
            placeholder={placeholder}
            onChangeText={value => setValue(value)}
            value={value}
            style={{ width: LAYOUT.window.width * 0.75 }}
          />
          {ErrorMark}
        </Item>
        {ErrorList}
      </View>
    );
  }

  // 正常入力
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
