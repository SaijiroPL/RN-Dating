import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

// from app
import Layout from "app/src/constants/Layout";
import Colors from "app/src/constants/Colors";

interface Props {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * 完了ボタン
 * @author kotatanaka
 */
export const CompleteButton: React.FC<Props> = (props: Props) => {
  const { disabled, title, onPress } = props;

  if (disabled) {
    return <Button buttonStyle={thisStyle.button} title={title} disabled />;
  }

  return (
    <Button buttonStyle={thisStyle.button} title={title} onPress={onPress} />
  );
};

/** デフォルト値 */
CompleteButton.defaultProps = {
  disabled: false
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    width: Layout.window.width * 0.75
  }
});
