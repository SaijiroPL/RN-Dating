import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// from app
import { COLOR, LAYOUT } from 'app/src/constants';
import { SelectButton, CompleteButton } from 'app/src/components/Button';
import {
  DatePicker,
  InputForm,
  PrefecturePicker,
  IdPreferenceForm,
} from 'app/src/components/Form';
import { useSignin, useSignup } from 'app/src/hooks';
import { getToday } from 'app/src/utils';
import { appStyle } from 'app/src/styles';

/** ユーザー基本情報入力画面 */
const EntryScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  /** ユーザー登録機能 */
  const {
    name,
    setName,
    isMan,
    setMan,
    isWoman,
    setWoman,
    birthday,
    setBirthday,
    prefecture,
    setPrefecture,
    onedid,
    setOnedid,
    createUser,
    errors,
  } = useSignup();

  /** ログイン機能 */
  const { setLoginUser } = useSignin();

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = useCallback(async (): Promise<void> => {
    const newUserId = await createUser();
    if (typeof newUserId === 'string') {
      setLoginUser(newUserId, name);
      navigate('Main');
    }
  }, [createUser]);

  /** 名前フォームの描画 */
  const renderNameForm = (): JSX.Element => {
    const nameErrors: Array<string> = [];
    if (errors && errors.detail_message.length > 0) {
      errors.detail_message.forEach((item) => {
        if (item.match(/Name/)) {
          nameErrors.push(item.replace('Nameは', ''));
        }
      });
    }

    return (
      <View style={thisStyle.formGroup}>
        <View style={{ marginRight: 20 }}>
          <Text style={thisStyle.entryText}>名前</Text>
        </View>
        <View style={{ width: LAYOUT.window.width * 0.4 }}>
          <InputForm
            placeholder=""
            value={name}
            setValue={setName}
            errors={nameErrors}
          />
        </View>
      </View>
    );
  };

  /** 性別選択ボタンの描画 */
  const SexButtons: JSX.Element = (
    <View style={thisStyle.formGroup}>
      <View style={{ marginRight: 30 }}>
        <Text style={thisStyle.entryText}>性別</Text>
      </View>
      <SelectButton
        value={isMan}
        setValue={setMan}
        setOtherValues={[setWoman]}
        buttonName="男性"
      />
      <SelectButton
        value={isWoman}
        setValue={setWoman}
        setOtherValues={[setMan]}
        buttonName="女性"
      />
    </View>
  );

  /** 生年月日選択フォームの描画 */
  const BirthdayForm: JSX.Element = (
    <View style={thisStyle.formGroup}>
      <Text style={thisStyle.entryText}>生年月日</Text>
      <DatePicker date={birthday} setDate={setBirthday} maxDate={getToday()} />
    </View>
  );

  /** 都道府県選択フォームの描画 */
  const AddressForm: JSX.Element = (
    <View style={thisStyle.formGroup}>
      <Text style={thisStyle.entryText}>住まい</Text>
      <PrefecturePicker prefecture={prefecture} setPrefecture={setPrefecture} />
    </View>
  );


  /** 1DID設定フォームの描画 */
  const OnedidForm = (): JSX.Element => {
    const onedidErrors: Array<string> = [];
    if (errors && errors.detail_message.length > 0) {
      errors.detail_message.forEach((item) => {
        if (item.match(/OnedateID/)) {
          onedidErrors.push(item.replace('OnedateIDは', ''));
        }
      });
    }
    return (
      <View style={thisStyle.formGroup}>
        <View style={{ marginRight: 20 }}>
          <Text style={thisStyle.entryText}>OnedateID</Text>
        </View>
        <View style={{ width: LAYOUT.window.width * 0.4 }}>
          <IdPreferenceForm
            placeholder=""
            value={onedid}
            setValue={setOnedid}
            errors={onedidErrors}
          />
        </View>
      </View>
    )
  };

  /** 入力完了ボタンの描画 */
  const InputCompleteButton: JSX.Element = (
    <View style={appStyle.emptySpace}>
      {/* 未入力項目がある場合はボタン押下不可 */}
      {name && (isMan || isWoman) && prefecture ? (
        <CompleteButton title="決定" onPress={onCompleteButtonPress} />
      ) : (
        <CompleteButton title="決定" disabled />
      )}
    </View>
  );

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      {renderNameForm()}
      {SexButtons}
      {BirthdayForm}
      {AddressForm}
      {OnedidForm()}
      {InputCompleteButton}
      <View style={appStyle.emptySpace} />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  entryText: {
    color: COLOR.textTintColor,
    fontFamily: 'genju-medium',
    fontSize: 20,
  },
});

export default EntryScreen;
