import * as React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

// from app
import images from "app/src/constants/images";
import layout from "app/src/constants/layout";
import { topStyle } from "app/src/styles/top-style";

interface Props {
  navigation: any;
}

interface State {
  screenPhase: number;
  mailAddress: string;
  password: string;
  rePassword: string;
}

/**
 * 初回起動時の画面
 * @author kotatanaka
 */
export default class TopScreen extends React.Component<Props, State> {
  public state: State = {
    // [0]初回画面 [1]メールアドレスログイン画面 [2]新規登録画面
    screenPhase: 0,
    mailAddress: "",
    password: "",
    rePassword: ""
  };

  /** Facebookログインボタン押下時の処理 */
  onFacebookButtonPress = () => {
    this.props.navigation.navigate("welcome");
  };

  /** メールアドレスログインボタン押下時の処理 */
  onSignInButtonPress = () => {
    this.props.navigation.navigate("main");
  };

  /** 新規登録ボタン押下時の処理 */
  onSignUpButtonPress = () => {
    this.props.navigation.navigate("welcome");
  };

  /** 初期画面を描画する */
  renderTopScreen() {
    return (
      <View>
        <FontAwesome.Button
          name="facebook"
          size={30}
          backgroundColor="#3b5998"
          borderRadius={30}
          iconStyle={{ marginLeft: 30 }}
          onPress={this.onFacebookButtonPress}
        >
          Facebookでログイン
        </FontAwesome.Button>
        <Text
          style={topStyle.linkStyle}
          onPress={() => this.setState({ screenPhase: 1 })}
        >
          メールアドレスでログイン
        </Text>
        <Text
          style={topStyle.linkStyle}
          onPress={() => this.setState({ screenPhase: 2 })}
        >
          新規登録はこちら
        </Text>
      </View>
    );
  }

  /** メールアドレスログイン画面を描画する */
  renderSignInScreen() {
    const { mailAddress, password } = this.state;

    return (
      <View>
        <Input
          placeholder="メールアドレスを入力"
          onChangeText={mailAddress => this.setState({ mailAddress })}
          value={mailAddress}
          containerStyle={topStyle.inputFormStyle}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => this.setState({ password })}
          value={password}
          containerStyle={topStyle.inputFormStyle}
        />
        <Button
          buttonStyle={topStyle.completeButtonStyle}
          title="ログイン"
          onPress={this.onSignInButtonPress}
        />
      </View>
    );
  }

  /** 新規登録画面を描画する */
  renderSignUpScreen() {
    const { mailAddress, password, rePassword } = this.state;

    return (
      <View>
        <Input
          placeholder="メールアドレスを入力"
          onChangeText={mailAddress => this.setState({ mailAddress })}
          value={mailAddress}
          containerStyle={topStyle.inputFormStyle}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => this.setState({ password })}
          value={password}
          containerStyle={topStyle.inputFormStyle}
        />
        <Input
          placeholder="パスワードを再入力"
          onChangeText={rePassword => this.setState({ rePassword })}
          value={rePassword}
          containerStyle={topStyle.inputFormStyle}
        />
        <Button
          buttonStyle={topStyle.completeButtonStyle}
          title="新規登録"
          onPress={this.onSignUpButtonPress}
        />
      </View>
    );
  }

  render() {
    const { screenPhase } = this.state;

    return (
      <View style={topStyle.containerStyle}>
        <View style={topStyle.emptySpaceStyle} />
        <View style={topStyle.topImageStyle}>
          <Image
            resizeMode="contain"
            source={images.logo}
            style={{ flex: 1 }}
            width={layout.window.width * 0.8}
          />
          <Text style={topStyle.welcomeTextStyle}>1Dateへようこそ</Text>
        </View>
        <View style={topStyle.linkGroupStyle}>
          {screenPhase === 0 && this.renderTopScreen()}
          {screenPhase === 1 && this.renderSignInScreen()}
          {screenPhase === 2 && this.renderSignUpScreen()}
        </View>
      </View>
    );
  }
}
