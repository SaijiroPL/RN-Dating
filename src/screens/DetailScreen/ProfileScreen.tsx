import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import axios, { CancelTokenSource } from "axios";

// from app
import { UserDetail } from "app/src/types/api/TUser";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner } from "app/src/components/Spinners";
import UserProfile from "app/src/components/contents/UserProfile";
import SettingFab from "app/src/components/buttons/SettingFab";
import appStyle from "app/src/styles/general-style";

/**
 * プロフィール(ユーザー詳細)画面トップ
 * @author kotatanaka
 */
const ProfileScreen: React.FC = () => {
  const userId = useNavigationParam("id");

  const [user, setUser] = useState<UserDetail>({
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
  const [errors, setErrors] = useState<BadRequestError>({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** ユーザー詳細取得 */
  const getUserDetail = (signal: CancelTokenSource) => {
    const url = Constants.manifest.extra.apiEndpoint + "/users/" + userId;

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
    return LoadingSpinner;
  }

  return (
    <View style={appStyle.standardContainer}>
      <UserProfile user={user} />
      <SettingFab />
    </View>
  );
};

export default ProfileScreen;
