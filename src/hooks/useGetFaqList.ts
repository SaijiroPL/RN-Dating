import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants';
import { IFaqList } from 'app/src/interfaces/api/Question';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';

/** よくある質問一覧取得フック */
export const useGetFaqList = () => {
  /** 正常レスポンス */
  const [questions, setQuestions] = useState<IFaqList>({
    question_list: [],
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getFaqList(signal);

    return () => {
      signal.cancel('Cancelling in Cleanup.');
    };
  }, []);

  /**
   * よくある質問一覧取得API
   * @param signal CancelTokenSource
   */
  const getFaqList = async (signal: CancelTokenSource): Promise<void> => {
    const url = API_ENDPOINT.QUESTIONS_FAQ;

    try {
      const { data } = await axios.get<IFaqList>(url, {
        cancelToken: signal.token,
      });
      setQuestions(Object.assign(data));
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

    setIsLoading(false);
  };

  return { isLoading, faqList: questions.question_list, errors };
};
