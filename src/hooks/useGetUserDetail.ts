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
 * @param userId 対象のユーザーID
 * @param meId 操作者のユーザーID
 */
export const useGetUserDetail = (userId: string, meId: string) => {
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
    follower_count: 0,
    is_follow: false
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

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
        params: {
          me_user_id: meId
        },
        cancelToken: signal.token
      })
      .then(response => {
        setUser(Object.assign(response.data));
        setIsUserLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          const apiError = handleError(error);
          if (apiError) {
            setErrors(apiError);
          }
        }
        setIsUserLoading(false);
      });
  };

  return { isUserLoading, user, errors };
};
