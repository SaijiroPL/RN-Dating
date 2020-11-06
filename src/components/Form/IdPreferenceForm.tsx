import React from 'react';
import { Content, Form, Text, Textarea, View, Input, Item } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  placeholder: string;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  errors?: Array<string>;
}

// from app
import { LAYOUT } from 'app/src/constants';
import { appTextStyle } from 'app/src/styles';

/** 1DiD入力フォーム */
export const IdPreferenceForm: React.FC<Props> = (props: Props) => {
  const { placeholder, value, setValue, errors }　= props;


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
      <Text style={appTextStyle.standardLightText}>※後で設定できます</Text>
    </View>
  );
};
