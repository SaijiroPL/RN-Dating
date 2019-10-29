import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IPlanList } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * 自分のお気に入りデートプラン一覧取得フック
 * @author kotatanaka
 * @param userId ユーザーID
 */
export const useGetLikePlanList = (userId: string) => {
  /** 正常レスポンス */
  const [plans, setPlans] = useState<IPlanList>({
    total: 0,
    plan_list: []
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
    getLikePlanList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * お気に入りデートプラン一覧取得API
   * @param signal CancelTokenSource
   */
  const getLikePlanList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER_LIKES.replace("$1", userId);

    axios
      .get<IPlanList>(url, {
        params: {
          user_id: userId
        },
        cancelToken: signal.token
      })
      .then(response => {
        setPlans(Object.assign(response.data));
        setIsLoading(false);
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
        setIsLoading(false);
      });
  };

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    getLikePlanList(axios.CancelToken.source());
    setRefreshing(false);
  };

  return { isLoading, plans, errors, isRefreshing, onRefresh };
};
