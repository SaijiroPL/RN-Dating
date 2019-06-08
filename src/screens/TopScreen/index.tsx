/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Button, SocialIcon, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

// from app
import images from "app/src/images";
import styles from "./styles";

// Constants
const SCREEN_WIDTH = Dimensions.get("window").width;

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
 * @author tanakakota
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
        <SocialIcon
          title="Facebookでログイン"
          button
          type="facebook"
          onPress={this.onFacebookButtonPress}
        />
        <Text
          style={styles.linkStyle}
          onPress={() => this.setState({ screenPhase: 1 })}
        >
          メールアドレスでログイン
        </Text>
        <Text
          style={styles.linkStyle}
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
          leftIcon={<Icon name="envelope-o" size={24} color="black" />}
          value={mailAddress}
          containerStyle={styles.inputFormStyle}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => this.setState({ password })}
          leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
          value={password}
          containerStyle={styles.inputFormStyle}
        />
        <Button
          buttonStyle={styles.completeButtonStyle}
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
          leftIcon={<Icon name="envelope-o" size={24} color="black" />}
          value={mailAddress}
          containerStyle={styles.inputFormStyle}
        />
        <Input
          placeholder="パスワードを入力"
          onChangeText={password => this.setState({ password })}
          leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
          value={password}
          containerStyle={styles.inputFormStyle}
        />
        <Input
          placeholder="パスワードを再入力"
          onChangeText={rePassword => this.setState({ rePassword })}
          leftIcon={<Icon name="unlock-alt" size={24} color="black" />}
          value={rePassword}
          containerStyle={styles.inputFormStyle}
        />
        <Button
          buttonStyle={styles.completeButtonStyle}
          title="新規登録"
          onPress={this.onSignUpButtonPress}
        />
      </View>
    );
  }

  render() {
    const { screenPhase } = this.state;

    return (
      <View style={styles.containerStyle}>
        <View style={styles.emptySpaceStyle} />
        <View style={styles.topImageStyle}>
          <Image
            resizeMode="contain"
            source={images.logo}
            style={{ flex: 1 }}
            width={SCREEN_WIDTH * 0.8}
          />
          <Text style={styles.welcomeTextStyle}>1Dateへようこそ</Text>
        </View>
        <View style={styles.linkGroupStyle}>
          {screenPhase === 0 && this.renderTopScreen()}
          {screenPhase === 1 && this.renderSignInScreen()}
          {screenPhase === 2 && this.renderSignUpScreen()}
        </View>
      </View>
    );
  }
}
