import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IPlanFull } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * デートプラン詳細取得フック
 * @author kotatanaka
 * @param planId 取得するデートプランID
 * @param userId 取得者のユーザーID
 */
export const useGetPlanDetail = (planId: string, userId: string) => {
  /** 正常レスポンス */
  const [plan, setPlan] = useState<IPlanFull>({
    plan_id: "",
    title: "",
    description: "",
    date: "",
    transportation: [],
    need_time: 0,
    create_date: "",
    spots: [],
    user_id: "",
    user_name: "",
    user_attr: "",
    user_image_url: "",
    like_count: 0,
    comment_count: 0,
    is_liked: false
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isPlanLoading, setIsPlanLoading] = useState<boolean>(true);

  /** お気に入り登録しているかどうか */
  const [isLiked, setIsLiked] = useState<boolean>(false);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getPlanDetail(signal);
    setIsLiked(plan.is_liked);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプラン詳細取得 */
  const getPlanDetail = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLAN.replace("$1", planId);
    axios
      .get(url, {
        params: {
          userId: userId
        },
        cancelToken: signal.token
      })
      .then((response: { data: IPlanFull }) => {
        setPlan(Object.assign(response.data));
        setIsPlanLoading(false);
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
        setIsPlanLoading(false);
      });
  };

  return { isPlanLoading, plan, isLiked, setIsLiked, errors };
};
