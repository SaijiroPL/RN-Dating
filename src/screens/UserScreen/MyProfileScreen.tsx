import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUserDetail } from "app/src/interfaces/api/User";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import { UserProfile } from "app/src/components/Content";
import { SettingFab } from "app/src/components/Button";
import { handleError } from "app/src/utils";

/**
 * マイプロフィール画面
 * @author kotatanaka
 */
const MyProfileScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");

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
    const url = API_ENDPOINT.USER.replace("$1", loginUser.id);

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
    <View style={thisStyle.container}>
      <UserProfile user={user} me />
      <SettingFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default MyProfileScreen;
