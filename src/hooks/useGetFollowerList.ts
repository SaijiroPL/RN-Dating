import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IFollowerList } from "app/src/interfaces/api/Follow";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * フォロワーリスト取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetFollowerList = (userId: string) => {
  /** 正常レスポンス */
  const [followers, setFollowers] = useState<IFollowerList>({
    total: 0,
    follower_list: []
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
    getFollowList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * フォローリスト取得
   * @param signal CancelTokenSource
   */
  const getFollowList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER_FOLLOWERS.replace("$1", userId);

    axios
      .get<IFollowerList>(url, {
        cancelToken: signal.token
      })
      .then(response => {
        setFollowers(Object.assign(response.data));
        setIsLoading(false);
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
        setIsLoading(false);
      });
  };

  return { isLoading, followers, errors };
};
