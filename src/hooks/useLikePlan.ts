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
  const likePlan = async (planId: string) => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    const body: ILikeBody = {
      user_id: userId
    };

    return await axios
      .post<IOK>(url, body)
      .then(() => {
        setErrors({ code: 0, message: "", detail_message: [] });
        return true;
      })
      .catch(error => {
        const apiError = handleError(error);
        if (apiError) {
          setErrors(apiError);
        }
        return false;
      });
  };

  /**
   * お気に入り解除API
   * @param planId デートプランID
   */
  const unlikePlan = async (planId: string) => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    return await axios
      .delete<IOK>(url, {
        params: {
          user_id: userId
        }
      })
      .then(() => {
        setErrors({ code: 0, message: "", detail_message: [] });
        return true;
      })
      .catch(error => {
        const apiError = handleError(error);
        if (apiError) {
          setErrors(apiError);
        }
        return false;
      });
  };

  return {
    likePlan,
    unlikePlan,
    errors
  };
};
