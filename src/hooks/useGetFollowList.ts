import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants/Url';
import { IFollowList } from 'app/src/interfaces/api/Follow';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';

/**
 * フォローリスト取得フック
 * @author kotatanaka
 * @param userId 対象のユーザーID
 */
export const useGetFollowList = (userId: string) => {
  /** 正常レスポンス */
  const [follows, setFollows] = useState<IFollowList>({
    total: 0,
    follow_list: [],
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getFollowList(signal);

    return () => {
      signal.cancel('Cancelling in Cleanup.');
    };
  }, []);

  /**
   * フォローリスト取得API
   * @param signal CancelTokenSource
   */
  const getFollowList = async (signal?: CancelTokenSource): Promise<void> => {
    const url = API_ENDPOINT.USER_FOLLOWS.replace('$1', userId);
    const cancelToken = signal
      ? signal.token
      : axios.CancelToken.source().token;

    try {
      const { data } = await axios.get<IFollowList>(url, {
        cancelToken,
      });
      setFollows(Object.assign(data));
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

  return { isLoading, follows, getFollowList, errors };
};
