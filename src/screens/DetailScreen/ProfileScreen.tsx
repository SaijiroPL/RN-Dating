import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigationParam } from "react-navigation-hooks";
import axios, { CancelTokenSource } from "axios";

// from app
import { IUserDetail } from "app/src/interfaces/api/User";
import { IApiError } from "app/src/interfaces/api/Error";
import { API_ENDPOINT } from "app/src/constants/Url";
import { LoadingSpinner } from "app/src/components/Spinners";
import UserProfile from "app/src/components/contents/UserProfile";
import { SettingFab } from "app/src/components/Button";
import { handleError } from "app/src/utils/ApiUtil";
import appStyle from "app/src/styles/GeneralStyle";

/**
 * プロフィール(ユーザー詳細)画面トップ
 * @author kotatanaka
 */
const ProfileScreen: React.FC = () => {
  const userId = useNavigationParam("id");

  const [user, setUser] = useState<IUserDetail>({
    user_id: "",
    name: "",
    profile: "",
    sex: "",
    age: 0,
    area: "",
    address: "",
    mail_address: "",
    user_attr: "",
    user_image_url: "",
    plan_count: 0,
    follow_count: 0,
    follower_count: 0
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
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
    const url = API_ENDPOINT.USER.replace("$1", userId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IUserDetail }) => {
        setUser(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          handleError(error);
          if (error.response.stats === 400) {
            setErrors(error.response.data);
          }
        }
        setIsLoading(false);
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
