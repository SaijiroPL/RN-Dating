import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { ILikeUserList } from "app/src/interfaces/api/Like";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * デートプランお気に入り登録者一覧取得フック
 * @author kotatanaka
 * @param planId デートプランID
 */
export const useGetLikeUserList = (planId: string) => {
  /** 正常レスポンス */
  const [users, setUsers] = useState<ILikeUserList>({
    total: 0,
    liked_user_list: []
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
    getLikeUserList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * デートプランお気に入り登録者一覧取得API
   * @param signal CancelTokenSource
   */
  const getLikeUserList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: ILikeUserList }) => {
        setUsers(Object.assign(response.data));
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

  return { isLoading, users, errors };
};
