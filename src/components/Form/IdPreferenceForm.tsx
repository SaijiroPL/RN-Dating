import React from 'react';
import { Text, View, Input, Item } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { validateAlphaNumeric, validateStringLength  } from 'app/src/utils';

interface Props {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errors: Array<string>;
}

// from app
import { LAYOUT } from 'app/src/constants';
import { appTextStyle } from 'app/src/styles';

/** 1DiD入力フォーム */
export const IdPreferenceForm: React.FC<Props> = (props: Props) => {
  const { placeholder, value, setValue, errors }　= props;

  const NoInput = <View />;
  const SuccessMark = <AntDesign name="checkcircle" color="green" />;
  const ErrorMark = <AntDesign name="closecircle" color="red" />;

  // 未入力
  if (value === '') {
    return (
      <View>
        <Item>
          <Input
          placeholder={placeholder}
          onChangeText={(value) => setValue(value)}
          value={value}
          style={{ width: LAYOUT.window.width * 0.75 }}
          />
        </Item>
        {NoInput}
        <Text style={appTextStyle.standardLightText}>※後で設定できます</Text>
      </View>
    );
  }

  if (!validateAlphaNumeric(value)) {
    errors.push('半角英数を入力してください');
  }


  if (validateStringLength(value)) {
    errors.push('6文字以上20文字以内にしてください');
  }

   // 異常入力
    if (errors && errors.length > 0) {
      const ErrorList = errors.map((item) => (
      <Text key={item} style={appTextStyle.errorText}>
        {item}
      </Text>
    ));

    return (
      <View>
        <Item error>
          <Input
          placeholder={placeholder}
          onChangeText={(value) => setValue(value)}
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
    <View>
      <Item success>
        <Input
          placeholder={placeholder}
          onChangeText={(value) => setValue(value)}
          value={value}
          style={{ width: LAYOUT.window.width * 0.75 }}
          />
          {SuccessMark}
      </Item>
    </View>
  );
};
