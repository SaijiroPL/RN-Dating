import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";

// from app
import { COLOR, LAYOUT } from "app/src/constants";
import { LoadingSpinner } from "app/src/components/Spinners";
import { SelectButton, CompleteButton } from "app/src/components/Button";
import {
  DatePicker,
  InputForm,
  PrefecturePicker
} from "app/src/components/Form";
import { useSignin, useSignup } from "app/src/hooks";
import { getToday } from "app/src/utils";
import { appStyle } from "app/src/styles";

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
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
    createUser,
    isLoading
  } = useSignup();

  /** ログイン機能 */
  const { setLoginUser } = useSignin();

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    createUser().then(createdUserId => {
      if (typeof createdUserId === "string") {
        setLoginUser(createdUserId, "xxx");
        navigate("main");
      }
    });
  };

  /** 名前フォームの描画 */
  const renderNameForm = () => {
    return (
      <View style={thisStyle.formGroup}>
        <View style={{ marginRight: 20 }}>
          <Text style={thisStyle.entryText}>名前</Text>
        </View>
        <View style={{ width: LAYOUT.window.width * 0.4 }}>
          <InputForm placeholder="" value={name} setValue={setName} />
        </View>
      </View>
    );
  };

  /** 性別選択ボタンの描画 */
  const renderSexButtons = () => {
    return (
      <View style={thisStyle.formGroup}>
        <View style={{ marginRight: 30 }}>
          <Text style={thisStyle.entryText}>性別</Text>
        </View>
        <SelectButton
          value={isMan}
          setValue={setMan}
          setOtherValues={[setWoman]}
          buttonName={"男性"}
        />
        <SelectButton
          value={isWoman}
          setValue={setWoman}
          setOtherValues={[setMan]}
          buttonName={"女性"}
        />
      </View>
    );
  };

  /** 生年月日選択フォームの描画 */
  const renderBirthdayForm = () => {
    return (
      <View style={thisStyle.formGroup}>
        <Text style={thisStyle.entryText}>生年月日</Text>
        <DatePicker
          date={birthday}
          setDate={setBirthday}
          maxDate={getToday()}
        />
      </View>
    );
  };

  /** 都道府県選択フォームの描画 */
  const renderAddressForm = () => {
    return (
      <View style={thisStyle.formGroup}>
        <Text style={thisStyle.entryText}>住まい</Text>
        <PrefecturePicker
          prefecture={prefecture}
          setPrefecture={setPrefecture}
        />
      </View>
    );
  };

  /** 入力完了ボタンの描画 */
  const renderCompleteButton = () => {
    if (isLoading) {
      return <View style={thisStyle.formGroup}>{LoadingSpinner}</View>;
    }

    return (
      <View style={appStyle.emptySpace}>
        {/* 未入力項目がある場合はボタン押下不可 */}
        {(isMan || isWoman) && prefecture.length > 0 ? (
          <CompleteButton title="決定" onPress={onCompleteButtonPress} />
        ) : (
          <CompleteButton title="決定" disabled />
        )}
      </View>
    );
  };

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      {renderNameForm()}
      {renderSexButtons()}
      {renderBirthdayForm()}
      {renderAddressForm()}
      {renderCompleteButton()}
      <View style={appStyle.emptySpace} />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  entryText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20
  }
});

export default EntryScreen;
