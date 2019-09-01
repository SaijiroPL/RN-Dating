import React from "react";
import { Button, Text } from "native-base";

// from app
import { appButtonStyle } from "app/src/styles/general-style";
import { createPlanTopScreenStyle } from "app/src/styles/create-screen-style";

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
        style={appButtonStyle.selectButtonInactive}
        onPress={() => setValues(true)}
      >
        <Text style={appButtonStyle.selectButtonInactiveText}>
          {buttonName}
        </Text>
      </Button>
    );
  } else {
    return (
      <Button
        small
        style={appButtonStyle.selectButtonActive}
        onPress={() => {
          if (reversible) setValues(false);
        }}
      >
        <Text style={appButtonStyle.selectButtonActiveText}>{buttonName}</Text>
      </Button>
    );
  }
};

SelectButton.defaultProps = {
  reversible: false
};

export default SelectButton;
