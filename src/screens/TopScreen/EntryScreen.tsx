import React, { useState } from "react";
import { View } from "react-native";
import { Constants } from "expo";
import { Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { OK } from "app/src/types/api/TSuccess";
import { BadRequestError } from "app/src/types/api/TError";
import { CreateUserBody } from "app/src/types/api/TUser";
import { LoadingSpinner } from "app/src/components/Spinners";
import SelectButton from "app/src/components/buttons/SelectButton";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import DatePicker from "app/src/components/contents/DatePicker";
import PrefecturePicker from "app/src/components/contents/PrefecturePicker";
import { handleError } from "app/src/utils/ApiUtil";
import { getToday, getAge } from "app/src/utils/DateUtil";
import appStyle from "app/src/styles/general-style";
import { entryScreenStyle } from "app/src/styles/top-screen-style";

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
const EntryScreen: React.FC = () => {
  const registerUser = useGlobalState("registerUser");
  const { navigate } = useNavigation();

  const [isMan, setMan] = useState<boolean>(false);
  const [isWoman, setWoman] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<string>("1995-01-01");
  const [prefecture, setPrefecture] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<OK>();
  const [errors, setErrors] = useState<BadRequestError>();

  /** ユーザー登録 */
  const createUser = () => {
    setIsLoading(true);

    const body: CreateUserBody = {
      // TODO 名前登録フォームを作る
      name: "xxx",
      sex: isMan ? "man" : "woman",
      age: getAge(birthday),
      area: prefecture,
      mail_address: registerUser.mailAddress,
      password: registerUser.password
    };

    axios
      .post(Constants.manifest.extra.apiEndpoint + "/users", body)
      .then((response: { data: OK }) => {
        setOk(response.data);
        setIsLoading(false);
        navigate("main");
      })
      .catch(error => {
        handleError(error);
        if (error.response.stats === 400) {
          setErrors(error.response.data);
        }
        setIsLoading(false);
      });
  };

  /** 完了ボタン押下でユーザー登録を行い、ホーム画面に遷移する */
  const onCompleteButtonPress = () => {
    createUser();
  };

  /** 性別選択ボタンを描画する */
  const renderSexButtons = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <View style={entryScreenStyle.sexTitleContainer}>
          <Text style={entryScreenStyle.entryText}>性別</Text>
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

  /** 生年月日選択フォームを描画する */
  const renderBirthdayForm = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <Text style={entryScreenStyle.entryText}>生年月日</Text>
        <DatePicker
          date={birthday}
          setDate={setBirthday}
          maxDate={getToday()}
        />
      </View>
    );
  };

  /** 都道府県選択フォームを描画する */
  const renderAddressForm = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <Text style={entryScreenStyle.entryText}>住まい</Text>
        <PrefecturePicker
          prefecture={prefecture}
          setPrefecture={setPrefecture}
        />
      </View>
    );
  };

  /** 入力完了ボタンを描画する */
  const renderCompleteButton = () => {
    if (isLoading) {
      return <View style={entryScreenStyle.formGroup}>{LoadingSpinner}</View>;
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
      {renderSexButtons()}
      {renderBirthdayForm()}
      {renderAddressForm()}
      {renderCompleteButton()}
      <View style={appStyle.emptySpace} />
    </View>
  );
};

export default EntryScreen;
