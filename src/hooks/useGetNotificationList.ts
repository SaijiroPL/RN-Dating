import { useState, useEffect, useCallback } from 'react';
import axios, { CancelTokenSource } from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants/Url';
import { INotificationList } from 'app/src/interfaces/api/Notification';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';

/**
 * 通知一覧取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetNotificationList = (userId: string) => {
  /** 正常レスポンス */
  const [notifications, setNotifications] = useState<INotificationList>({
    unread_count: 0,
    notification_list: [],
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
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
      signal.cancel('Cancelling in Cleanup.');
    };
  }, []);

  /** プルリロード */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  /**
   * 通知一覧取得API
   * @param signal CancelTokenSource
   */
  const getNotificationList = async (
    signal: CancelTokenSource,
  ): Promise<void> => {
    const url = API_ENDPOINT.USER_NOTIFICATIONS.replace('$1', userId);

    try {
      const { data } = await axios.get<INotificationList>(url, {
        cancelToken: signal.token,
      });
      setNotifications(Object.assign(data));
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log(`Request Cancelled: ${err.message}`);
      } else {
        const apiError = handleError(err);
        if (apiError) {
          setErrors(apiError);
        }
      }
    }

    setIsLoading(false);
  };

  return { isLoading, isRefreshing, onRefresh, notifications, errors };
};
