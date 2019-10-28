import { useState, useEffect } from "react";
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
  const searchPlanList = (signal?: CancelTokenSource) => {
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

    axios
      .get<IPlanList>(url, {
        params: {
          keyword: searchWord,
          user_id: loginUser.id
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
          handleError(error);
          if (error.response.stats === 400) {
            setErrors(error.response.data);
          }
          setIsLoading(false);
        }
      });
  };

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    searchPlanList();
    setRefreshing(false);
  };

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
