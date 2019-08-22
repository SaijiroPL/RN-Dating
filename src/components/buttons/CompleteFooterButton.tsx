import React from "react";
import { Button, Footer, Text } from "native-base";

// from app
import { appButtonStyle, appTextStyle } from "app/src/styles/general-style";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * フッター完了ボタン
 * @author kotatanaka
 */
const CompleteFooterButton: React.FC<Props> = ({
  title,
  onPress,
  disabled
}) => {
  if (disabled) {
    return (
      <Footer style={appButtonStyle.disTouchableFooter}>
        <Button
          transparent
          disabled
          style={appButtonStyle.completeFooterButton}
        >
          <Text style={appTextStyle.inactiveText}>{title}</Text>
        </Button>
      </Footer>
    );
  }

  return (
    <Footer style={appButtonStyle.touchableFooter}>
      <Button
        transparent
        onPress={onPress}
        style={appButtonStyle.completeFooterButton}
      >
        <Text style={appTextStyle.whiteText}>{title}</Text>
      </Button>
    </Footer>
  );
};

CompleteFooterButton.defaultProps = {
  disabled: false
};

export default CompleteFooterButton;
