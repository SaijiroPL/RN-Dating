import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { ICommentList } from "app/src/interfaces/api/Comment";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * コメント一覧取得フック
 * @author kotatanaka
 * @param planId コメントのデートプランID
 */
export const useGetCommentList = (planId: string) => {
  /** 正常レスポンス */
  const [comments, setComments] = useState<ICommentList>({
    total: 0,
    comment_list: []
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getCommentList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * コメント一覧取得API
   * @param signal CancelTokenSource
   */
  const getCommentList = async (signal: CancelTokenSource): Promise<void> => {
    const url = API_ENDPOINT.PLAN_COMMENTS.replace("$1", planId);

    try {
      const { data } = await axios.get<ICommentList>(url, {
        cancelToken: signal.token
      });
      setComments(Object.assign(data));
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

    setIsCommentsLoading(false);
  };

  return { isCommentsLoading, comments, errors };
};
