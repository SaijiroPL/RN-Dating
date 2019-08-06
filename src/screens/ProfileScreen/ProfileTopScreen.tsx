import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Constants } from "expo";
import { Spinner } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import Globals from "app/src/Globals";
import { UserDetail } from "app/src/types/api/TUser";
import { BadRequestError } from "app/src/types/api/TError";
import UserProfile from "app/src/components/contents/UserProfile";
import SettingFab from "app/src/components/buttons/SettingFab";
import { profileStyle } from "app/src/styles/profile-screen-style";

/**
 * プロフィール画面トップ
 * @author kotatanaka
 */
const ProfileTopScreen: React.FC = () => {
  const [user, setUser] = useState({
    user_id: "",
    name: "",
    sex: "",
    age: 0,
    area: "",
    mail_address: "",
    user_attr: "",
    user_image_url: "",
    plan_count: 0,
    follow_count: 0,
    follower_count: 0
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** ユーザー詳細取得 */
  const getUserDetail = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/users/" + Globals.loginUser.id;

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: UserDetail }) => {
        setUser(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          console.log("API Error: " + error.message);
        }
      });
  };

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

  return (
    <View style={profileStyle.container}>
      <UserProfile user={user} />
      <SettingFab />
    </View>
  );
};

export default ProfileTopScreen;
