import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { INotificationList } from "app/src/interfaces/api/Notification";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 通知一覧取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetNotificationList = (userId: string) => {
  /** 正常レスポンス */
  const [notifications, setNotifications] = useState<INotificationList>({
    unread_count: 0,
    notification_list: []
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
    getNotificationList(signal);
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
  const getNotificationList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER_NOTIFICATIONS.replace("$1", userId);

    axios
      .get<INotificationList>(url, {
        cancelToken: signal.token
      })
      .then(response => {
        setNotifications(Object.assign(response.data));
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

  return { isLoading, isRefreshing, onRefresh, notifications, errors };
};
