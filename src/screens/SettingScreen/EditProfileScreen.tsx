import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Form,
  View,
  ListItem,
  Left,
  Right,
  Switch,
  Text,
  Body,
} from 'native-base';
import FlashMessage, { showMessage } from 'react-native-flash-message';

// from app
import { useGlobalState } from 'app/src/Store';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { CompleteButton } from 'app/src/components/Button';
import {
  InputLabelForm,
  InputLabelTextAreaForm,
} from 'app/src/components/Form';

import { useEditProfile } from 'app/src/hooks';
import { isEmpty } from 'app/src/utils';
import { appTextStyle } from 'app/src/styles';

/**
 * プロフィール編集画面
 * @author itsukiyamada, kotatanaka
 */
const EditProfileScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

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
    errors,
  } = useEditProfile(loginUser.id);

  /** 更新ボタン押下時の処理 */
  const onCompleteButtonPress = useCallback(async (): Promise<void> => {
    const result = await updateProfile();
    if (result) {
      showMessage({
        message: 'プロフィールを更新しました。',
        type: 'success',
      });
    }
  }, [updateProfile]);

  const nameErrors: Array<string> = [];
  const profileErrors: Array<string> = [];
  const emailErrors: Array<string> = [];
  const addressErrors: Array<string> = [];
  if (errors && errors.detail_message.length > 0) {
    errors.detail_message.forEach((item) => {
      if (item.match(/Name/)) {
        nameErrors.push(item.replace('Nameは', ''));
      }
      if (item.match(/Profile/)) {
        profileErrors.push(item.replace('Profileは', ''));
      }
      if (item.match(/Mail address/)) {
        emailErrors.push(item.replace('Mail addressは', ''));
      }
      if (item.match(/Address/)) {
        addressErrors.push(item.replace('Addressは', ''));
      }
    });
  }

  const [privateOn, setPrivateOn] = useState<boolean>(false);

  const handleSwitchPrivateValue = useCallback((value: boolean) => {
    setPrivateOn(value);
  }, []);

  // ローディング
  if (isLoading) {
    return LoadingSpinner;
  }

  /** 更新ボタンの描画 */
  const UpdateButton = (
    <View style={thisStyle.button}>
      {/* 更新ボタン(必須項目が未入力の場合は非活性) */}
      {isEmpty(name) || isEmpty(mailAddress) || isEmpty(`${age}`) ? (
        <CompleteButton title="更新" disabled />
      ) : (
        <CompleteButton title="更新" onPress={onCompleteButtonPress} />
      )}
    </View>
  );

  /** 更新成功時メッセージ */
  const SuccessMessage = (
    <FlashMessage
      position="bottom"
      duration={2500}
      titleStyle={{ fontFamily: 'genju-medium', textAlign: 'center' }}
    />
  );

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm
            label="ユーザーネーム"
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
        <ListItem icon>
          <Left>
            <Text style={appTextStyle.standardText}>
              アカウントを非公開にする
            </Text>
          </Left>
          <Body />
          <Right>
            <Switch
              onValueChange={handleSwitchPrivateValue}
              value={privateOn}
            />
          </Right>
        </ListItem>
        {UpdateButton}
      </Content>
      {SuccessMessage}
    </Container>
  );
};

export default EditProfileScreen;

/** スタイリング */
const thisStyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
});
