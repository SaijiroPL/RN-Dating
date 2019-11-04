import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IHistoryList } from "app/src/interfaces/api/History";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 検索履歴一覧取得・検索履歴削除フック
 * @author itsukiyamada
 * @param userId ユーザーID
 */
export const useGetHistoryList = (userId: string) => {
  /** 検索履歴一覧取得 正常レスポンス */
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

    axios
      .get<IHistoryList>(url, {
        params: {
          user_id: userId
        },
        cancelToken: signal.token
      })
      .then(response => {
        setHistories(Object.assign(response.data));
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
      });
  };

  /**
   * 検索履歴削除API
   * @param id 検索履歴ID
   */
  const deleteHistory = async (id: number) => {
    const url = API_ENDPOINT.PLANS_SEARCH_HISTORY.replace("$1", `${id}`);

    return await axios
      .delete<IOK>(url, {
        params: {
          user_id: userId
        }
      })
      .then(() => {
        // 検索履歴一覧再読み込み
        getHistoryList(axios.CancelToken.source());
        return true;
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
        return false;
      });
  };

  return { histories, deleteHistory, errors };
};
