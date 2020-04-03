import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form } from 'native-base';
import { useNavigation } from 'react-navigation-hooks';

// from app
import { useGlobalState } from 'app/src/Store';
import { InputFormFloating } from 'app/src/components/Form';
import { CompleteButton } from 'app/src/components/Button';
import { useUpdatePassword } from 'app/src/hooks';
import { isEmpty } from 'app/src/utils';
import { appStyle } from 'app/src/styles';

/**
 * パスワード変更画面
 * @author itsukiyamada, kotatanaka
 */
const ChangePasswordScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** パスワード変更 */
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    updatePassword,
    errors,
  } = useUpdatePassword(loginUser.id);

  /** 現在のパスワードのバリデーションエラー */
  const oldPasswordErrors: Array<string> = [];

  /** 新しいパスワードのバリデーションエラー */
  const newPasswordErrors: Array<string> = [];

  /** パスワードの確認のバリデーションエラー */
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<
    Array<string>
  >([]);

  /** ライフサイクル */
  useEffect(() => {
    setConfirmPasswordErrors([]);
  }, [newPassword, confirmNewPassword]);

  // APIバリデーションエラーの分別
  if (errors && errors.detail_message.length > 0) {
    errors.detail_message.forEach((item) => {
      if (item.match(/Old Password/)) {
        oldPasswordErrors.push(
          item.replace('Old Passwordが', '現在のパスワードが'),
        );
      } else if (item.match(/Password/)) {
        newPasswordErrors.push(item.replace('Passwordは', ''));
      }
    });
  }

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = useCallback(async (): Promise<void> => {
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordErrors(['パスワードが間違っています']);

      return;
    }

    const result = await updatePassword();
    if (result) {
      navigate('top');
    }
  }, [newPassword, confirmNewPassword]);

  /** 完了ボタン */
  const ChangePasswordButton: JSX.Element = (
    <View style={appStyle.standardContainer}>
      {isEmpty(oldPassword) ||
      isEmpty(newPassword) ||
      isEmpty(confirmNewPassword) ? (
        <CompleteButton title="完了" disabled />
      ) : (
        <CompleteButton title="完了" onPress={onCompleteButtonPress} />
      )}
    </View>
  );

  return (
    <View style={thisStyle.container}>
      <Form>
        <InputFormFloating
          label="現在のパスワード"
          value={oldPassword}
          setValue={setOldPassword}
          errors={oldPasswordErrors}
        />
        <InputFormFloating
          label="新しいパスワード"
          value={newPassword}
          setValue={setNewPassword}
          errors={newPasswordErrors}
        />
        <InputFormFloating
          label="新しいパスワードの確認"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
          errors={confirmPasswordErrors}
        />
      </Form>
      {ChangePasswordButton}
      <View style={appStyle.emptySpace} />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
  },
});

export default ChangePasswordScreen;
