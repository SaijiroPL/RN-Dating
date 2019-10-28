import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUserDetail } from "app/src/interfaces/api/User";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * ユーザー詳細取得フック
 * @author kotatanaka
 * @param userId ユーザーID
 */
export const useGetUserDetail = (userId: string) => {
  /** 正常レスポンス */
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

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * ユーザー詳細取得API
   * @param signal CancelTokenSource
   */
  const getUserDetail = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER.replace("$1", userId);

    axios
      .get<IUserDetail>(url, {
        cancelToken: signal.token
      })
      .then(response => {
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

  return { isLoading, user, errors };
};
