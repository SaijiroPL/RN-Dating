import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Constants } from "expo";
import axiosBase from "axios";

// from app
import globals from "app/src/globals";
import { UserDetail, BadRequestError } from "app/src/constants/interfaces";
import UserProfile from "app/src/components/UserProfile";
import { profileStyle } from "app/src/styles/profile-screen-style";

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/users"
});

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
    plan_count: 1
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });

  useEffect(() => {
    getUserDetail();
  }, []);

  /** ユーザー詳細取得 */
  const getUserDetail = () => {
    axios
      .get("" + "/" + globals.loginUser.id)
      .then((response: { data: UserDetail }) => {
        setUser(Object.assign(response.data));
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
      });
  };

  return (
    <View style={profileStyle.container}>
      <UserProfile user={user} />
    </View>
  );
};

export default ProfileTopScreen;
