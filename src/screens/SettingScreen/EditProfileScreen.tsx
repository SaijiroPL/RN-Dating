import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Form, View } from "native-base";
import FlashMessage, { showMessage } from "react-native-flash-message";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { CompleteButton } from "app/src/components/Button";
import { InputLabelForm } from "app/src/components/Form";
import { InputLabelTextAreaForm } from "app/src/components/Form";
import { useEditProfile } from "app/src/hooks";
import { isEmpty } from "app/src/utils";

/**
 * プロフィール編集画面
 * @author itsukiyamada, kotatanaka
 */
const EditProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** ユーザー情報取得とプロフィール更新 */
  const {
    name,
    setName,
    profile,
    setProfile,
    age,
    setAge,
    address,
    setAddress,
    mailAddress,
    setMailAddress,
    updateProfile,
    isLoading,
    errors
  } = useEditProfile(loginUser.id);

  /** 更新ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    updateProfile().then(success => {
      if (success) {
        showMessage({
          message: "プロフィールを更新しました。",
          type: "success"
        });
      }
    });
  };

  /** 更新ボタンの描画 */
  const renderCompleteButton = () => {
    if (
      isEmpty(name) ||
      isEmpty(profile) ||
      isEmpty(mailAddress) ||
      isEmpty(`${age}`) ||
      isEmpty(address)
    ) {
      // 未入力がある場合はアクティブにしない
      return <CompleteButton title="更新" disabled />;
    }
    return <CompleteButton title="更新" onPress={onCompleteButtonPress} />;
  };

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  const nameErrors: Array<string> = [];
  const profileErrors: Array<string> = [];
  const emailErrors: Array<string> = [];
  const addressErrors: Array<string> = [];
  if (errors && errors.detail_message.length > 0) {
    errors.detail_message.forEach(item => {
      if (item.match(/Name/)) {
        nameErrors.push(item.replace("Nameは", ""));
      }
      if (item.match(/Profile/)) {
        profileErrors.push(item.replace("Profileは", ""));
      }
      if (item.match(/Mail address/)) {
        emailErrors.push(item.replace("Mail addressは", ""));
      }
      if (item.match(/Address/)) {
        addressErrors.push(item.replace("Addressは", ""));
      }
    });
  }

  /** 更新成功時メッセージ */
  const SuccessMessage = (
    <FlashMessage
      position="bottom"
      duration={2500}
      titleStyle={{ fontFamily: "genju-medium", textAlign: "center" }}
    />
  );

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm
            label="名前"
            value={name}
            setValue={setName}
            errors={nameErrors}
          />
          <InputLabelTextAreaForm
            label="自己紹介"
            value={profile}
            setValue={setProfile}
            errors={profileErrors}
          />
          <InputLabelForm
            label="メール"
            value={mailAddress}
            setValue={setMailAddress}
            errors={emailErrors}
          />
          <InputLabelForm
            label="年齢"
            numValue={age || 0}
            setNumValue={setAge}
          />
          <InputLabelForm
            label="住まい"
            value={address}
            setValue={setAddress}
            errors={addressErrors}
          />
        </Form>
        <View style={thisStyle.button}>{renderCompleteButton()}</View>
      </Content>
      {SuccessMessage}
    </Container>
  );
};

export default EditProfileScreen;

/** スタイリング */
const thisStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: 50
  }
});
