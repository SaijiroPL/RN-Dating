import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";

// from app
import { useDispatch, useGlobalState } from "app/src/Store";
import { ActionType } from "app/src/Reducer";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { ICreateUserBody } from "app/src/interfaces/api/User";
import Colors from "app/src/constants/Colors";
import { API_ENDPOINT } from "app/src/constants/Url";
import { LoadingSpinner } from "app/src/components/Spinners";
import SelectButton from "app/src/components/buttons/SelectButton";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import DatePicker from "app/src/components/contents/DatePicker";
import PrefecturePicker from "app/src/components/contents/PrefecturePicker";
import { handleError } from "app/src/utils/ApiUtil";
import { getToday, getAge } from "app/src/utils/DateUtil";
import appStyle from "app/src/styles/GeneralStyle";

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
const EntryScreen: React.FC = () => {
  const registerUser = useGlobalState("registerUser");
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [isMan, setMan] = useState<boolean>(false);
  const [isWoman, setWoman] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<string>("1995-01-01");
  const [prefecture, setPrefecture] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IApiError>();

  /** ユーザー登録 */
  const createUser = () => {
    setIsLoading(true);

    const url = API_ENDPOINT.USER;

    const body: ICreateUserBody = {
      // TODO 名前登録フォームを作る
      name: "xxx",
      sex: isMan ? "man" : "woman",
      age: getAge(birthday),
      area: prefecture,
      mail_address: registerUser.mailAddress,
      password: registerUser.password
    };

    axios
      .post(url, body)
      .then((response: { data: IOK }) => {
        setIsLoading(false);
        setLoginUser(response.data.id, "xxx");
        navigate("main");
      })
      .catch(error => {
        handleError(error);
        if (error.response.state === 400) {
          setErrors(error.response.data);
        }
        setIsLoading(false);
      });
  };

  /** 新規登録ユーザーをログインユーザーとして永続化 */
  const setLoginUser = (id: string, name: string) => {
    dispatch({
      type: ActionType.SET_LOGIN_USER,
      payload: {
        id: id,
        name: name,
        imageUrl: ""
      }
    });
  };

  /** 完了ボタン押下でユーザー登録を行い、ホーム画面に遷移する */
  const onCompleteButtonPress = () => {
    createUser();
  };

  /** 性別選択ボタンを描画する */
  const renderSexButtons = () => {
    return (
      <View style={thisStyle.formGroup}>
        <View style={thisStyle.sexTitleContainer}>
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

  /** 生年月日選択フォームを描画する */
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

  /** 都道府県選択フォームを描画する */
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

  /** 入力完了ボタンを描画する */
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
    color: Colors.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20
  },
  sexTitleContainer: {
    marginRight: 30
  }
});

export default EntryScreen;
