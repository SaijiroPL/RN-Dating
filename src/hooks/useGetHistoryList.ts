import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IHistoryList } from "app/src/interfaces/api/History";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 検索履歴一覧取得フック
 * @author itsukiyamada
 * @param userId ユーザーID(Optional:検索履歴一覧取得時に必要)
 */
export const useGetHistoryList = (userId: string) => {
  /** 正常レスポンス */
  const [histories, setHistories] = useState<IHistoryList>({
    total: 0,
    history_list: []
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
    getHistoryList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * 検索履歴一覧取得API
   * @param signal CancelTokenSource
   */
  const getHistoryList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLANS_SEARCH_HISTORIES;

    const cancelToken = signal.token;
    const config = {
      params: {
        userId: userId
      },
      cancelToken: cancelToken
    };

    axios
      .get<IHistoryList>(url, config)
      .then(response => {
        setHistories(Object.assign(response.data));
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

  return { isLoading, histories, errors };
};
