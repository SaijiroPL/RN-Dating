import { useState } from 'react';
import axios from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';
import { IOK } from '../interfaces/api/Success';
import { ISpotFull } from '../interfaces/api/Plan';

export interface IPostPlan {
  user_id: string;
  title: string;
  description: string;
  date: string;
  need_time: number;
  transportation: string[];
  spots: ISpotFull[];
  status: 'public' | 'private' | 'delete';
}

export const usePostPlan = () => {
  const [plan, setPlan] = useState<IPostPlan>();

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  const createPost = async (): Promise<boolean> => {
    const url = API_ENDPOINT.PLANS;
    try {
      const { data } = await axios.post<IOK>(url, plan);
      console.log(data);
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        setErrors(apiError);
      }

      return false;
    }

    setErrors({ code: 0, message: '', detail_message: [] });

    return true;
  };

  return { plan, setPlan, errors, createPost };
};
