import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants";
import { IFaqList } from "app/src/interfaces/api/Question";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * よくある質問一覧取得フック
 * @author kotatanaka
 */
export const useGetFaqList = () => {
  /** 正常レスポンス */
  const [questions, setQuestions] = useState<IFaqList>({
    question_list: []
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getFaqList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /**
   * よくある質問一覧取得API
   * @param signal CancelTokenSource
   */
  const getFaqList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.QUESTIONS_FAQ;

    axios
      .get<IFaqList>(url, { cancelToken: signal.token })
      .then(response => {
        setQuestions(Object.assign(response.data));
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
        }
        setIsLoading(false);
      });
  };

  return { isLoading, faqList: questions.question_list, errors };
};
