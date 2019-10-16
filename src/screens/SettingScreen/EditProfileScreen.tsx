import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Form, View } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { CompleteButton } from "app/src/components/Button";
import { InputLabelForm } from "app/src/components/Form";
import { useEditProfile } from "app/src/hooks";
import { isEmpty } from "app/src/utils";

/**
 * プロフィール編集画面
 * @author itsukiyamada, kotatanaka
 */
const EditProfileScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

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
    isLoading,
    updateProfile
  } = useEditProfile(loginUser.id);

  /** 更新ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    updateProfile().then(() => navigate("top"));
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

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm label="名前" value={name} setValue={setName} />
          <InputLabelForm
            label="自己紹介"
            value={profile}
            setValue={setProfile}
          />
          <InputLabelForm
            label="メール"
            value={mailAddress}
            setValue={setMailAddress}
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
          />
        </Form>
        <View style={thisStyle.button}>{renderCompleteButton()}</View>
      </Content>
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
