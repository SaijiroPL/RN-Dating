import React from "react";
import { Button } from "react-native-elements";

// from app
import commonStyle from "app/src/styles/common-style";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * 完了ボタン
 * @author kotatanaka
 */
const CompleteButton: React.FC<Props> = ({ title, onPress, disabled }) => {
  if (disabled) {
    return (
      <Button buttonStyle={commonStyle.completeButton} title={title} disabled />
    );
  }

  return (
    <Button
      buttonStyle={commonStyle.completeButton}
      title={title}
      onPress={onPress}
    />
  );
};

CompleteButton.defaultProps = {
  disabled: false
};

export default CompleteButton;
