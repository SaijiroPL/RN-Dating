import { useState, useEffect, useCallback } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT } from "app/src/constants";
import { IPlanList } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * デートプラン検索フック
 * @author kotatanaka
 */
export const useSearchPlanList = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState("loginUser");

  /** 検索ワード */
  const [searchWord, setSearchWord] = useState<string>("");

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** リフレッシュ状態 */
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    searchPlanList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * デートプラン検索API
   * @param signal CancelTokenSource(Optional)
   */
  const searchPlanList = async (signal?: CancelTokenSource): Promise<void> => {
    if (searchWord === "") {
      return;
    }

    if (!isRefreshing) {
      setIsLoading(true);
    }

    if (!signal) {
      signal = axios.CancelToken.source();
    }

    const url = API_ENDPOINT.PLANS_SEARCH;

    try {
      const { data } = await axios.get<IPlanList>(url, {
        params: {
          keyword: searchWord,
          user_id: loginUser.id
        },
        cancelToken: signal.token
      });
      setPlans(Object.assign(data));
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request Cancelled: " + err.message);
      } else {
        const apiError = handleError(err);
        if (apiError) {
          setErrors(apiError);
        }
      }
    }

    setIsLoading(false);
  };

  /** プルリロード */
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await searchPlanList();
    setRefreshing(false);
  }, []);

  return {
    isLoading,
    searchWord,
    setSearchWord,
    searchPlanList,
    plans,
    errors,
    isRefreshing,
    onRefresh
  };
};
