import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";

// from app
import Colors from "app/src/constants/Colors";

interface Props {
  // 現在のオンオフ状態
  value: boolean;
  // 当該ボタンのオンオフ状態を更新する関数
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  // 他のボタンのオンオフ状態を更新する関数のリスト
  setOtherValues?: Array<React.Dispatch<React.SetStateAction<boolean>>>;
  // オン状態をオフ状態に変更可能か
  reversible?: boolean;
  // ボタンの表示名
  buttonName: string;
}

/**
 * 選択ボタン
 * @author kotatanaka
 */
const SelectButton: React.FC<Props> = (props: Props) => {
  const { value, setValue, setOtherValues, reversible, buttonName } = props;

  const setValues = (value: boolean) => {
    setValue(value);

    // 他のボタンのオンオフを当該ボタンの逆の状態に更新する
    if (
      setOtherValues !== undefined &&
      setOtherValues !== null &&
      setOtherValues.length
    ) {
      setOtherValues.forEach(
        (setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
          setValue(!value);
        }
      );
    }
  };

  if (!value) {
    return (
      <Button
        small
        light
        style={thisStyle.inactiveButton}
        onPress={() => setValues(true)}
      >
        <Text style={thisStyle.inactiveText}>{buttonName}</Text>
      </Button>
    );
  } else {
    return (
      <Button
        small
        style={thisStyle.activeButton}
        onPress={() => {
          if (reversible) setValues(false);
        }}
      >
        <Text style={thisStyle.inactiveButton}>{buttonName}</Text>
      </Button>
    );
  }
};

/** デフォルト値 */
SelectButton.defaultProps = {
  reversible: false
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  inactiveButton: {
    marginHorizontal: 5
  },
  activeButton: {
    backgroundColor: Colors.tintColor,
    marginHorizontal: 5
  },
  inactiveText: {
    color: Colors.textTintColor,
    fontFamily: "genju-medium"
  },
  activeText: {
    color: "white",
    fontFamily: "genju-medium"
  }
});

export default SelectButton;
