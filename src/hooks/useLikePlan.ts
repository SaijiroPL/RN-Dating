import { useState } from "react";
import axios from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { ILikeBody } from "app/src/interfaces/api/Like";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * お気に入り登録・解除フック
 * @author kotatanaka
 * @param userId 操作を行うユーザーID
 */
export const useLikePlan = (userId: string) => {
  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /**
   * お気に入り登録API
   * @param planId デートプランID
   */
  const likePlan = async (planId: string): Promise<boolean> => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    const body: ILikeBody = {
      user_id: userId
    };

    try {
      await axios.post<IOK>(url, body);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        setErrors(apiError);
      }
      return false;
    }

    setErrors({ code: 0, message: "", detail_message: [] });
    return true;
  };

  /**
   * お気に入り解除API
   * @param planId デートプランID
   */
  const unlikePlan = async (planId: string): Promise<boolean> => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    try {
      await axios.delete<IOK>(url, {
        params: {
          user_id: userId
        }
      });
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        setErrors(apiError);
      }
      return false;
    }

    setErrors({ code: 0, message: "", detail_message: [] });
    return true;
  };

  return {
    likePlan,
    unlikePlan,
    errors
  };
};
