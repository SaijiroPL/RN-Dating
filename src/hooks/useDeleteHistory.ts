import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";
import { IOK } from "app/src/interfaces/api/Success";

/**
 * 検索履歴削除フック
 * @author itsukiyamada
 * @param userId ユーザーID(Optional:検索履歴一覧取得時に必要)
 */
export const useDeleteHistory = (userId: string) => {
  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /**
   * 検索履歴削除API
   * @param signal CancelTokenSource
   */
  const deleteHistory = async (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLANS_SEARCH_HISTORY;

    const cancelToken = signal.token;
    const config = {
      params: {
        userId: userId
      },
      cancelToken: cancelToken
    };

    return await axios
      .delete<IOK>(url, config)
      .then(() => {
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
};
