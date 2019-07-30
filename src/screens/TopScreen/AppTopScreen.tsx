import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Button, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

// from app
import globals from "app/src/globals";
import images from "app/src/constants/images";
import layout from "app/src/constants/layout";
import colors from "app/src/constants/colors";
import { topStyle } from "app/src/styles/top-screen-style";

// 仮置き定数
const loginUserId = "ab097f77-9f49-4b5e-9b83-e5419bc11d0d";

/**
 * 初回起動時の画面
 * @author kotatanaka
 */
const AppTopScreen: React.FC = () => {
  const { navigate } = useNavigation();

  // [0]初回画面 [1]メールアドレスログイン画面 [2]新規登録画面
  const [screenPhase, setScreenPhase] = useState(0);
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  /** Facebookログインボタン押下時の処理 */
  const onFacebookButtonPress = () => {
    navigate("welcome");
  };

  /** メールアドレスログインボタン押下時の処理 */
  const onSignInButtonPress = () => {
    globals.loginUser.id = loginUserId;
    navigate("main");
  };

  /** 新規登録ボタン押下時の処理 */
  const onSignUpButtonPress = () => {
    navigate("welcome");
  };

  /** 初期画面を描画する */
  const renderTopScreen = () => {
    return (
      <View>
        <FontAwesome.Button
          name="facebook"
          size={30}
          backgroundColor={colors.facebookColor}
          borderRadius={30}
          iconStyle={{ marginLeft: 30 }}
          onPress={onFacebookButtonPress}
        >
          Facebookでログイン
        </FontAwesome.Button>
        <Text style={topStyle.link} onPress={() => setScreenPhase(1)}>
          メールアドレスでログイン
        </Text>
        <Text style={topStyle.link} onPress={() => setScreenPhase(2)}>
          新規登録はこちら
        </Text>
      </View>
    );
  };

  /** メールアドレスログイン画面を描画する */
  const renderSignInScreen = () => {
    return (
      <View>
        <Input
          placeholder="メールアドレスを入力"
          onChangeText={mailAddress => setMailAddress(mailAddress)}
          value={mailAddress}
          containerStyle={topStyle.inputForm}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => setPassword(password)}
          value={password}
          containerStyle={topStyle.inputForm}
        />
        <Button
          buttonStyle={topStyle.completeButton}
          title="ログイン"
          onPress={onSignInButtonPress}
        />
      </View>
    );
  };

  /** 新規登録画面を描画する */
  const renderSignUpScreen = () => {
    return (
      <View>
        <Input
          placeholder="メールアドレスを入力"
          onChangeText={mailAddress => setMailAddress(mailAddress)}
          value={mailAddress}
          containerStyle={topStyle.inputForm}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => setPassword(password)}
          value={password}
          containerStyle={topStyle.inputForm}
        />
        <Input
          placeholder="パスワードを再入力"
          onChangeText={confirmPassword => setConfirmpassword(confirmPassword)}
          value={confirmPassword}
          containerStyle={topStyle.inputForm}
        />
        <Button
          buttonStyle={topStyle.completeButton}
          title="新規登録"
          onPress={onSignUpButtonPress}
        />
      </View>
    );
  };

  return (
    <View style={topStyle.topContainer}>
      <View style={topStyle.emptySpace} />
      <View style={topStyle.topImage}>
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{ flex: 1 }}
          width={layout.window.width * 0.8}
        />
        <Text style={topStyle.welcomeText}>1Dateへようこそ</Text>
      </View>
      <View style={topStyle.linkGroup}>
        {screenPhase === 0 && renderTopScreen()}
        {screenPhase === 1 && renderSignInScreen()}
        {screenPhase === 2 && renderSignUpScreen()}
      </View>
    </View>
  );
};

export default AppTopScreen;
