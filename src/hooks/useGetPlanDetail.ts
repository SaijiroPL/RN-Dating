import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants';
import { IPlanFull } from 'app/src/interfaces/api/Plan';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';

/**
 * デートプラン詳細取得フック
 * @author kotatanaka
 * @param planId 取得するデートプランID
 * @param userId 取得者のユーザーID
 */
export const useGetPlanDetail = (planId: string, userId: string) => {
  /** 正常レスポンス */
  const [plan, setPlan] = useState<IPlanFull>({
    plan_id: '',
    title: '',
    description: '',
    date: '',
    transportation: [],
    need_time: 0,
    create_date: '',
    spots: [],
    user_id: '',
    user_name: '',
    user_attr: '',
    user_image_url: '',
    like_count: 0,
    comment_count: 0,
    is_liked: false,
    is_follow: false,
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  /** ローディング状態 */
  const [isPlanLoading, setIsPlanLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getPlanDetail(signal);

    return () => {
      signal.cancel('Cancelling in Cleanup.');
    };
  }, []);

  /**
   * デートプラン詳細取得API
   * @param signal CancelTokenSource
   */
  const getPlanDetail = async (signal?: CancelTokenSource): Promise<void> => {
    const url = API_ENDPOINT.PLAN.replace('$1', planId);
    const cancelToken = signal
      ? signal.token
      : axios.CancelToken.source().token;

    try {
      const { data } = await axios.get<IPlanFull>(url, {
        params: {
          user_id: userId,
        },
        cancelToken,
      });
      setPlan(Object.assign(data));
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

    setIsPlanLoading(false);
  };

  return { isPlanLoading, plan, getPlanDetail, errors };
};
