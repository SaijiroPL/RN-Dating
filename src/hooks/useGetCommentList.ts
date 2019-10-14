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
  const getCommentList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLAN_COMMENTS.replace("$1", planId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: ICommentList }) => {
        setComments(Object.assign(response.data));
        setIsCommentsLoading(false);
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
        setIsCommentsLoading(false);
      });
  };

  return { isCommentsLoading, comments, errors };
};
