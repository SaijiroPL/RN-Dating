import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IFollowList } from "app/src/interfaces/api/Follow";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * フォローリスト取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetFollowList = (userId: string) => {
  /** 正常レスポンス */
  const [follows, setFollows] = useState<IFollowList>({
    total: 0,
    follow_list: []
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
   * フォローリスト取得API
   * @param signal CancelTokenSource
   */
  const getFollowList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER_FOLLOWS.replace("$1", userId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IFollowList }) => {
        setFollows(Object.assign(response.data));
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

  return { isLoading, follows, errors };
};
