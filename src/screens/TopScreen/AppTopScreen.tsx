import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { FontAwesome } from "@expo/vector-icons";

// from app
import { facebookLogin } from "app/src/Firebase";
import { COLOR, IMAGE, LAYOUT } from "app/src/constants";
import { LoadingSpinner } from "app/src/components/Spinners";
import { InputForm } from "app/src/components/Form";
import { CompleteButton } from "app/src/components/Button";
import { useSignin, useSignup } from "app/src/hooks";
import { appStyle } from "app/src/styles";

/**
 * 初回起動時の画面
 * @author kotatanaka
 */
const AppTopScreen: React.FC = () => {
  /** ナビゲーター */
  const { navigate } = useNavigation();

  /**
   * 現在画面
   * [0]初回画面
   * [1]メールアドレスログイン画面
   * [2]新規登録画面
   */
  const [screenPhase, setScreenPhase] = useState<number>(0);

  /** メールアドレス */
  const [mailAddress, setMailAddress] = useState<string>("");

  /** パスワード */
  const [password, setPassword] = useState<string>("");

  /** パスワードの確認(ユーザー登録用) */
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  /** ログイン機能 */
  const { isLoading, loginByEmail, errors } = useSignin();

  /** ユーザー登録機能 */
  const { setRegisterUserParts } = useSignup();

  /** Facebookログインボタン押下時の処理 */
  const onFacebookButtonPress = () => {
    facebookLogin().then(() => navigate("welcome"));
  };

  /** メールアドレスログインボタン押下時の処理 */
  const onSignInButtonPress = () => {
    loginByEmail(mailAddress, password).then(success => {
      if (success) {
        navigate("main");
      }
    });
  };

  /** 新規登録ボタン押下時の処理 */
  const onSignUpButtonPress = () => {
    if (password === confirmPassword) {
      setRegisterUserParts(mailAddress, password);
      navigate("welcome");
    }
    setPassword("");
    setConfirmPassword("");
  };

  /** 初期画面 */
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

  /** メールアドレスログイン画面 */
  const renderSignInScreen = () => {
    if (isLoading) {
      return LoadingSpinner;
    }

    const emailErrors: Array<string> = [];
    const passwordErrors: Array<string> = [];
    if (errors && errors.detail_message.length > 0) {
      errors.detail_message.forEach(item => {
        if (item.match(/Mail Address/) || item === "ユーザーが見つかりません") {
          emailErrors.push(item.replace("Mail Addressは", ""));
        }
        if (item.match(/Password/)) {
          passwordErrors.push(item.replace("Passwordは", ""));
        }
      });
    }

    return (
      <View>
        <InputForm
          placeholder="メールアドレスを入力"
          value={mailAddress}
          setValue={setMailAddress}
          errors={emailErrors}
        />
        <InputForm
          placeholder="パスワードを入力"
          value={password}
          setValue={setPassword}
          errors={passwordErrors}
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

  /** 新規登録画面 */
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
