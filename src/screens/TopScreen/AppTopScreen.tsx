import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { FontAwesome } from "@expo/vector-icons";

// from app
import { facebookLogin } from "app/src/Firebase";
import { COLOR, IMAGE, LAYOUT } from "app/src/constants";
import { InputForm } from "app/src/components/Form";
import { CompleteButton } from "app/src/components/Button";
import { useSignin, useSignup } from "app/src/hooks";
import { validateEmail, validateAlphaNumeric } from "app/src/utils";
import { appStyle, appTextStyle } from "app/src/styles";

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

  /** メールアドレス(ログイン用) */
  const [emailAtSignin, setEmailAtSignin] = useState<string>("");

  /** パスワード(ログイン用) */
  const [passAtSignin, setPassAtSignin] = useState<string>("");

  /** メールアドレス(新規登録用) */
  const [emailAtSignup, setEmailAtSignup] = useState<string>("");

  /** パスワード(新規登録用) */
  const [passAtSignup, setPassAtSignup] = useState<string>("");

  /** パスワードの確認(新規登録用) */
  const [confirmPassAtSignup, setConfirmPassAtSignup] = useState<string>("");

  /** メールアドレスバリデーションエラー(新規登録用) */
  const [emailErrAtSignup, setEmailErrAtSignup] = useState<Array<string>>([]);

  /** パスワードバリデーションエラー(新規登録用)  */
  const [passErrAtSignup, setPassErrAtSignup] = useState<Array<string>>([]);

  /** パスワード確認バリデーションエラー(新規登録用)  */
  const [confirmPassErrAtSignup, setConfirmPassErrAtSignup] = useState<
    Array<string>
  >([]);

  /** ログイン機能 */
  const { loginByEmail, errors } = useSignin();

  /** ユーザー登録機能 */
  const { setRegisterUserParts } = useSignup();

  /** Facebookログインボタン押下時の処理 */
  const onFacebookButtonPress = () => {
    facebookLogin().then(() => navigate("welcome"));
  };

  /** メールアドレスログインボタン押下時の処理 */
  const onSignInButtonPress = () => {
    loginByEmail(emailAtSignin, passAtSignin).then(success => {
      if (success) {
        navigate("main");
      }
    });
  };

  /** 新規登録ボタン押下時の処理 */
  const onSignUpButtonPress = () => {
    const emailErrors: Array<string> = [];
    const passErrors: Array<string> = [];
    const confirmPassErrors: Array<string> = [];

    if (!validateEmail(emailAtSignup)) {
      emailErrors.push("メールアドレスを入力してください");
    }
    if (!validateAlphaNumeric(passAtSignup)) {
      passErrors.push("半角英数を入力してください");
    }
    if (!validateAlphaNumeric(confirmPassAtSignup)) {
      confirmPassErrors.push("半角英数を入力してください");
    }
    if (passAtSignup !== confirmPassAtSignup) {
      confirmPassErrors.push("パスワードが一致しません");
    }

    setEmailErrAtSignup(emailErrors);
    setPassErrAtSignup(passErrors);
    setConfirmPassErrAtSignup(confirmPassErrors);

    if (
      emailErrors.length === 0 &&
      passErrors.length === 0 &&
      confirmPassErrors.length === 0
    ) {
      setRegisterUserParts(emailAtSignup, passAtSignup);
      navigate("welcome");
    }
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
            setEmailAtSignin(masterMailAddress);
            setPassAtSignin(masterPassword);
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
    const emailErrAtSignin: Array<string> = [];
    const passwordErrAtSignin: Array<string> = [];
    if (errors && errors.detail_message.length > 0) {
      errors.detail_message.forEach(item => {
        if (item.match(/Mail Address/) || item === "ユーザーが見つかりません") {
          emailErrAtSignin.push(item.replace("Mail Addressは", ""));
        }
        if (item.match(/Password/)) {
          passwordErrAtSignin.push(item.replace("Passwordは", ""));
        }
      });
    }

    return (
      <View>
        <InputForm
          placeholder="メールアドレスを入力"
          value={emailAtSignin}
          setValue={setEmailAtSignin}
          errors={emailErrAtSignin}
        />
        <InputForm
          placeholder="パスワードを入力"
          value={passAtSignin}
          setValue={setPassAtSignin}
          errors={passwordErrAtSignin}
        />
        <View style={thisStyle.completeButtonContainer}>
          {/* 未入力項目がある場合はボタン押下不可 */}
          {emailAtSignin.length > 0 && passAtSignin.length > 0 ? (
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
          value={emailAtSignup}
          setValue={setEmailAtSignup}
          errors={emailErrAtSignup}
        />
        <InputForm
          placeholder="パスワードを入力"
          value={passAtSignup}
          setValue={setPassAtSignup}
          errors={passErrAtSignup}
        />
        <InputForm
          placeholder="パスワードを再入力"
          value={confirmPassAtSignup}
          setValue={setConfirmPassAtSignup}
          errors={confirmPassErrAtSignup}
        />
        <View style={thisStyle.completeButtonContainer}>
          {/* 未入力項目がある場合はボタン押下不可 */}
          {emailAtSignup.length > 0 &&
          passAtSignup.length > 0 &&
          confirmPassAtSignup.length > 0 ? (
            <CompleteButton title="新規登録" onPress={onSignUpButtonPress} />
          ) : (
            <CompleteButton title="新規登録" disabled />
          )}
        </View>
      </View>
    );
  };

  /** 利用規約とプライバシーポリシーのリンクの描画 */
  const renderTermsLinks = () => {
    return (
      <View style={thisStyle.termsLinkContainer}>
        <Text onPress={() => navigate("terms")} style={appTextStyle.linkText}>
          利用規約
        </Text>
        <View style={{ width: 20 }} />
        <Text onPress={() => navigate("privacy")} style={appTextStyle.linkText}>
          プライバシーポリシー
        </Text>
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
        {renderTermsLinks()}
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
  termsLinkContainer: {
    flexDirection: "row"
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
