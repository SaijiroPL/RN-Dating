import React from "react";
import { StyleSheet } from "react-native";
import { Button, Footer, Text } from "native-base";

// from app
import Layout from "app/src/constants/Layout";
import Colors from "app/src/constants/Colors";
import appTextStyle from "app/src/styles/GeneralTextStyle";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * フッター完了ボタン
 * @author kotatanaka
 */
const CompleteFooterButton: React.FC<Props> = (props: Props) => {
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
    backgroundColor: Colors.tintColor
  },
  disTouchable: {
    backgroundColor: Colors.baseBackgroundColor
  },
  button: {
    justifyContent: "center",
    width: Layout.window.width
  }
});

export default CompleteFooterButton;
