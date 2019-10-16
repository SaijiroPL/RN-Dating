import React from "react";
import { View } from "react-native";
import { Form } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { InputFormFloating } from "app/src/components/Form";
import { CompleteButton } from "app/src/components/Button";
import { useUpdatePassword } from "app/src/hooks";
import { isEmpty } from "app/src/utils";
import { appStyle } from "app/src/styles";

/**
 * パスワード変更画面
 * @author itsukiyamada, kotatanaka
 */
const ChangePasswordScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** パスワード変更 */
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isLoading,
    errors,
    updatePassword
  } = useUpdatePassword(loginUser.id);

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    if (newPassword === confirmNewPassword) {
      updatePassword().then(() => navigate("top"));
    }
    setNewPassword("");
    setConfirmNewPassword("");
  };

  /** 完了ボタンの描画 */
  const renderCompleteButton = () => {
    if (
      isEmpty(oldPassword) ||
      isEmpty(newPassword) ||
      isEmpty(confirmNewPassword)
    ) {
      // 未入力がある場合はアクティブにしない
      return <CompleteButton title="完了" disabled />;
    }

    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <Form style={{ flex: 3, justifyContent: "center" }}>
        <InputFormFloating
          label="現在のパスワード"
          value={oldPassword}
          setValue={setOldPassword}
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
