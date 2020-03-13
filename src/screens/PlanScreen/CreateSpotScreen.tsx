import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Form,
  View,
  DatePicker,
  ListItem,
  CheckBox,
  Picker,
  Item,
  Icon
} from "native-base";
import FlashMessage, { showMessage } from "react-native-flash-message";

// from app
import { useGlobalState } from "app/src/Store";
import { LoadingSpinner } from "app/src/components/Spinners";
import { CompleteButton } from "app/src/components/Button";
import { InputLabelForm } from "app/src/components/Form";
import { InputLabelTextAreaForm } from "app/src/components/Form";
import { useEditProfile } from "app/src/hooks";
import { isEmpty, getToday } from "app/src/utils";
import { COLOR } from "app/src/constants";

/**
 * プロフィール編集画面
 * @author itsukiyamada
 */
const CreateSpotScreen: React.FC = () => {
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
    errors,
    date,
    setDate,
    selected2,
    onValueChange2
  } = useEditProfile(loginUser.id);

  /**スポットのカテゴリを追加 */
  const [selected2, onValueChange2] = useState<boolean>(false);

  /** 更新ボタン押下時の処理 */
  const onCompleteButtonPress = useCallback(async (): Promise<void> => {
    const result = await updateProfile();
    if (result) {
      showMessage({
        message: "プロフィールを更新しました。",
        type: "success"
      });
    }
  }, [updateProfile]);

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
      titleStyle={{ fontFamily: "genju-medium", textAlign: "center" }}
    />
  );

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm
            label="名称"
            value={name}
            setValue={setName}
            errors={nameErrors}
          />
        </Form>
        <View>
          <Form>
            <Itempicker>
              <Picker
                style={thisStyle.itemTitleText}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="カテゴリを選択"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="映えスポット" value="key0" />
                <Picker.Item label="宿泊施設" value="key1" />
                <Picker.Item label="レストラン" value="key2" />
                <Picker.Item label="カフェ" value="key3" />
                <Picker.Item label="衣類用品店" value="key4" />
                <Picker.Item label="ATM" value="key5" />
                <Picker.Item label="ショッピングモール" value="key6" />
                <Picker.Item label="スーパー" value="key7" />
                <Picker.Item label="インテリア用品店" value="key8" />
                <Picker.Item label="家電量販店" value="key9" />
                <Picker.Item label="ジム" value="key10" />
                <Picker.Item label="オフィス" value="key11" />
                <Picker.Item label="薬局" value="key12" />
                <Picker.Item label="博物館/美術館" value="key13" />
                <Picker.Item label="映画館" value="key14" />
                <Picker.Item label="ナイトクラブ" value="key15" />
              </Picker>
            </Itempicker>
          </Form>
        </View>
        /**　マップのスポットを選択できる機能を挿入 */
        <Form>
          <View style={thisStyle.formGroup}>
            <Text style={thisStyle.itemTitleText}>スポット営業時間</Text>
            <DatePicker date={date} setDate={setDate} minDate={getToday()} />
          </View>
          <InputLabelForm
            label="電話番号"
            value={address}
            setValue={setAddress}
            errors={addressErrors}
          />
        </Form>
        {UpdateButton}
      </Content>
      {SuccessMessage}
    </Container>
  );
};

export default CreateSpotScreen;

/** スタイリング */
const thisStyle = StyleSheet.create({
  formGroup: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    marginTop: 50
  },
  itemTitleText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    marginRight: 10
  },
  category: {
    color: "#bfc6ea",
    width: "undefined"
  }
});
