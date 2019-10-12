import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

// from app
import { useDispatch } from "app/src/Store";
import { ActionType } from "app/src/Reducer";
import { facebookLogin } from "app/src/Firebase";
import { API_ENDPOINT, COLOR, IMAGE, LAYOUT } from "app/src/constants";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { ILogin } from "app/src/interfaces/api/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { InputForm } from "app/src/components/Form";
import { CompleteButton } from "app/src/components/Button";
import { handleError } from "app/src/utils";
import { appStyle } from "app/src/styles";

/**
 * 初回起動時の画面
 * @author kotatanaka
 */
const AppTopScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  // [0]初回画面 [1]メールアドレスログイン画面 [2]新規登録画面
  const [screenPhase, setScreenPhase] = useState<number>(0);
  const [mailAddress, setMailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IApiError>();

  /** メールアドレスでログイン */
  const login = () => {
    setIsLoading(true);

    const url = API_ENDPOINT.USERS_LOGIN;
    const body: ILogin = {
      mail_address: mailAddress,
      password: password
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

  /** ログインユーザーを永続化 */
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

  /** ユーザー登録に必要な情報の永続化 */
  const setRegisterUserParts = () => {
    dispatch({
      type: ActionType.SET_REGISTER_USER,
      payload: {
        mailAddress: mailAddress,
        password: password
      }
    });
  };

  /** Facebookログインボタン押下時の処理 */
  const onFacebookButtonPress = () => {
    facebookLogin();
    // FIXME ログインが完了しユーザーをストアに入れてから画面遷移する
    navigate("welcome");
  };

  /** メールアドレスログインボタン押下時の処理 */
  const onSignInButtonPress = () => {
    login();
  };

  /** 新規登録ボタン押下時の処理 */
  const onSignUpButtonPress = () => {
    if (password === confirmPassword) {
      setRegisterUserParts();
      navigate("welcome");
    }
    setPassword("");
    setConfirmPassword("");
  };

  /** 初期画面を描画する */
  const renderTopScreen = () => {
    return (
      <View>
        <FontAwesome.Button
          name="facebook"
          size={30}
          backgroundColor={COLOR.facebookColor}
          borderRadius={30}
          iconStyle={{ marginLeft: 30 }}
          onPress={onFacebookButtonPress}
        >
          Facebookでログイン
        </FontAwesome.Button>
        <Text
          style={thisStyle.link}
          onPress={() => {
            // デートマスターを初期値に設定しておく
            const masterMailAddress = "master@onedate.com";
            const masterPassword = "password";
            setMailAddress(masterMailAddress);
            setPassword(masterPassword);
            setScreenPhase(1);
          }}
        >
          メールアドレスでログイン
        </Text>
        <Text style={thisStyle.link} onPress={() => setScreenPhase(2)}>
          新規登録はこちら
        </Text>
      </View>
    );
  };

  /** メールアドレスログイン画面を描画する */
  const renderSignInScreen = () => {
    if (isLoading) {
      return LoadingSpinner;
    }

    return (
      <View>
        <InputForm
          placeholder="メールアドレスを入力"
          value={mailAddress}
          setValue={setMailAddress}
        />
        <InputForm
          placeholder="パスワードを入力"
          value={password}
          setValue={setPassword}
        />
        <View style={thisStyle.completeButtonContainer}>
          {/* 未入力項目がある場合はボタン押下不可 */}
          {mailAddress.length > 0 && password.length > 0 ? (
            <CompleteButton title="ログイン" onPress={onSignInButtonPress} />
          ) : (
            <CompleteButton title="ログイン" disabled />
          )}
        </View>
      </View>
    );
  };

  /** 新規登録画面を描画する */
  const renderSignUpScreen = () => {
    return (
      <View>
        <InputForm
          placeholder="メールアドレスを入力"
          value={mailAddress}
          setValue={setMailAddress}
        />
        <InputForm
          placeholder="パスワードを入力"
          value={password}
          setValue={setPassword}
        />
        <InputForm
          placeholder="パスワードを再入力"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <View style={thisStyle.completeButtonContainer}>
          {/* 未入力項目がある場合はボタン押下不可 */}
          {mailAddress.length > 0 &&
          password.length > 0 &&
          confirmPassword.length > 0 ? (
            <CompleteButton title="新規登録" onPress={onSignUpButtonPress} />
          ) : (
            <CompleteButton title="新規登録" disabled />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      <View style={thisStyle.topImage}>
        <Image
          resizeMode="contain"
          source={IMAGE.logo}
          style={{ flex: 1 }}
          width={LAYOUT.window.width * 0.8}
        />
        <Text style={thisStyle.welcomeText}>1Dateへようこそ</Text>
      </View>
      <View style={thisStyle.linkOrFormGroup}>
        {screenPhase === 0 && renderTopScreen()}
        {screenPhase === 1 && renderSignInScreen()}
        {screenPhase === 2 && renderSignUpScreen()}
      </View>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  topImage: {
    alignItems: "center",
    flex: 2,
    justifyContent: "center"
  },
  linkOrFormGroup: {
    alignItems: "center",
    flex: 3,
    justifyContent: "center"
  },
  completeButtonContainer: {
    marginTop: 20
  },
  welcomeText: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10
  },
  link: {
    color: COLOR.textTintColor,
    fontFamily: "genju-medium",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    textDecorationColor: COLOR.tintColor,
    textDecorationLine: "underline"
  }
});

export default AppTopScreen;
