import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IInformationList } from "app/src/interfaces/api/Notification";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 運営からのお知らせ一覧取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetInformationList = (userId: string) => {
  /** 正常レスポンス */
  const [information, setInformation] = useState<IInformationList>({
    unread_count: 0,
    information_list: []
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
    getInformationList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  /**
   * 通知一覧取得API
   * @param signal CancelTokenSource
   */
  const getInformationList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.INFORMATION;

    axios
      .get<IInformationList>(url, {
        params: {
          user_id: userId
        },
        cancelToken: signal.token
      })
      .then(response => {
        setInformation(Object.assign(response.data));
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

  return { isLoading, isRefreshing, onRefresh, information, errors };
};
