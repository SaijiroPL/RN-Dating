import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Footer, Text, Left, Right } from 'native-base';

// from app
import { LAYOUT, COLOR } from 'app/src/constants';
import { appTextStyle } from 'app/src/styles';

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/** フッター完了ボタン */
export const CompleteFooterButton: React.FC<Props> = (props: Props) => {
  const { disabled, title, onPress } = props;

  if (disabled) {
    return (
      <Footer style={thisStyle.disTouchable}>
        <Button transparent disabled style={thisStyle.button}>
          <Text style={appTextStyle.inactiveText}>{title}</Text>
        </Button>
      </Footer>
    );
  }

  return (
    <Footer style={thisStyle.touchable}>
      <Left style={{ flexDirection: 'row' }}>
        <Text note>ト厳選画面</Text>
        <Text note style={{ marginLeft: 10 }}>
          3ト
        </Text>
        <Text note style={{ marginLeft: 20 }}>
          ト厳選画面
        </Text>
        <Text note style={{ marginLeft: 10 }}>
          3:00
        </Text>
      </Left>
      <Right>
        <Button onPress={onPress} style={thisStyle.button}>
          <Text style={appTextStyle.whiteText}>{title}</Text>
        </Button>
      </Right>
    </Footer>
  );
};

/** デフォルト値 */
CompleteFooterButton.defaultProps = {
  disabled: false,
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  touchable: {
    backgroundColor: COLOR.greyColor,
    height: LAYOUT.window.height * 0.04,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  disTouchable: {
    backgroundColor: COLOR.greyColor,
    height: LAYOUT.window.height * 0.04,
    padding: 5,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.3,
  },
});
