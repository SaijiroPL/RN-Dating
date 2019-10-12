import React from "react";
import { StyleSheet } from "react-native";
import { Button, Footer, Text } from "native-base";

// from app
import { LAYOUT, COLOR } from "app/src/constants";
import { appTextStyle } from "app/src/styles";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * フッター完了ボタン
 * @author kotatanaka
 */
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
      <Button transparent onPress={onPress} style={thisStyle.button}>
        <Text style={appTextStyle.whiteText}>{title}</Text>
      </Button>
    </Footer>
  );
};

/** デフォルト値 */
CompleteFooterButton.defaultProps = {
  disabled: false
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  touchable: {
    backgroundColor: COLOR.tintColor
  },
  disTouchable: {
    backgroundColor: COLOR.baseBackgroundColor
  },
  button: {
    justifyContent: "center",
    width: LAYOUT.window.width
  }
});
