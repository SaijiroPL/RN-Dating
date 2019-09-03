import React, { useState } from "react";
import { View } from "react-native";
import { Form } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import InputFormFloating from "app/src/components/contents/InputFormFloating";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { isEmpty } from "app/src/utils/CheckUtil";
import appStyle from "app/src/styles/general-style";

/**
 * パスワード変更画面
 * @author itsukiyamada
 */
const ChangePasswordScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    // TODO パスワード変更APIを叩く
    navigate("top");
  };

  /**
   * 完了ボタンを描画する
   * 未入力がある場合は押せないようにする
   */
  const renderCompleteButton = () => {
    if (
      isEmpty(currentPassword) ||
      isEmpty(newPassword) ||
      isEmpty(confirmNewPassword)
    ) {
      return <CompleteButton title="完了" disabled />;
    }

    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };

  return (
    <View style={appStyle.standardContainer}>
      <Form style={{ flex: 3, justifyContent: "center" }}>
        <InputFormFloating
          label="現在のパスワード"
          value={currentPassword}
          setValue={setCurrentPassword}
        />
        <InputFormFloating
          label="新しいパスワード"
          value={newPassword}
          setValue={setNewPassword}
        />
        <InputFormFloating
          label="新しいパスワードの確認"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
        />
      </Form>
      <View style={appStyle.standardContainer}>{renderCompleteButton()}</View>
      <View style={appStyle.emptySpace} />
    </View>
  );
};

export default ChangePasswordScreen;
