import React from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import axiosBase from "axios";

// from app
import globals from "app/src/globals";
import { UserDetail, BadRequestError } from "app/src/constants/interfaces";
import UserProfile from "app/src/components/UserProfile";
import { profileStyle } from "app/src/styles/profile-screen-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  user: UserDetail;
  errors: BadRequestError;
}

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/users"
});

/**
 * プロフィール画面トップ
 * @author kotatanaka
 */
export default class HomeTopScreen extends React.Component<Props, State> {
  public state: State = {
    user: {
      user_id: "",
      name: "",
      sex: "",
      age: 0,
      area: "",
      mail_address: "",
      user_attr: "",
      user_image_url: "",
      plan_count: 1
    },
    errors: { code: 0, message: "", detail_massage: [] }
  };

  componentDidMount() {
    this.getUserDetail();
  }

  /** ユーザー詳細取得 */
  getUserDetail() {
    axios
      .get("" + "/" + globals.loginUser.id)
      .then((response: { data: UserDetail }) => {
        this.setState({ user: response.data });
      })
      .catch((error: BadRequestError) => {
        this.setState({ errors: error });
      });
  }

  render() {
    const { navigation } = this.props;
    const { user } = this.state;

    return (
      <View style={profileStyle.container}>
        <UserProfile navigation={navigation} user={user} />
      </View>
    );
  }
}
