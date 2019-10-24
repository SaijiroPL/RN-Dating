import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IDeleteHistory } from "app/src/interfaces/api/History";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 検索履歴削除フック
 * @author itsukiyamada
 * @param userId ユーザーID(Optional:検索履歴一覧取得時に必要)
 */
export const useDeleteHistory = (userId: string) => {
  /** 正常レスポンス */
  const [histories, setHistories] = useState<IDeleteHistory>({
    history_id: 0,
    user_id: ""
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** リフレッシュ状態 */
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    deleteDeleteHistory(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * デートプラン一覧取得API
   * @param signal CancelTokenSource
   */
  const deleteDeleteHistory = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLANS_SEARCH;

    const cancelToken = signal.token;
    const config = userId
      ? // マイプラン一覧取得
        {
          params: {
            userId: userId
          },
          cancelToken: cancelToken
        }
      : // 通常のプラン一覧取得
        { cancelToken: cancelToken };

    axios
      .delete(url, config)
      .then((response: { data: IDeleteHistory }) => {
        setHistories(Object.assign(response.data));
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

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    deleteDeleteHistory(axios.CancelToken.source());
    setRefreshing(false);
  };

  return { isLoading, histories, errors, isRefreshing, onRefresh };
};
