import React from "react";
import { Button, Footer, Text } from "native-base";

// from app
import commonStyle from "app/src/styles/common-style";

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
      <Footer style={commonStyle.disTouchableFooter}>
        <Button transparent disabled style={commonStyle.completeFooterButton}>
          <Text style={commonStyle.inactiveText}>{title}</Text>
        </Button>
      </Footer>
    );
  }

  return (
    <Footer style={commonStyle.touchableFooter}>
      <Button
        transparent
        onPress={onPress}
        style={commonStyle.completeFooterButton}
      >
        <Text style={commonStyle.whiteText}>{title}</Text>
      </Button>
    </Footer>
  );
};

CompleteFooterButton.defaultProps = {
  disabled: false
};

export default CompleteFooterButton;
