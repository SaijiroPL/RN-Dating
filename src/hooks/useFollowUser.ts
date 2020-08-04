import { useState } from 'react';
import axios from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants/Url';
import { IFollowBody } from 'app/src/interfaces/api/Follow';
import { IOK } from 'app/src/interfaces/api/Success';
import { IApiError } from 'app/src/interfaces/api/Error';
import { handleError } from 'app/src/utils';

/**
 * アカウントフォロー・フォロー解除フック
 * @param userId 操作を行うユーザーID
 */
export const useFollowUser = (userId: string) => {
  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  /**
   * アカウントフォローAPI
   * @param targetUserId フォロー対象のユーザーID
   */
  const follow = async (targetUserId: string): Promise<boolean> => {
    const url = API_ENDPOINT.USER_FOLLOWERS.replace('$1', targetUserId);

    const body: IFollowBody = {
      user_id: userId,
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

    setErrors({ code: 0, message: '', detail_message: [] });

    return true;
  };

  /**
   * アカウントフォロー解除API
   * @param targetUserId フォロー解除対象のユーザーID
   */
  const unfollow = async (targetUserId: string): Promise<boolean> => {
    const url = API_ENDPOINT.USER_FOLLOWERS.replace('$1', targetUserId);

    try {
      await axios.delete<IOK>(url, {
        params: {
          user_id: userId,
        },
      });
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

  return { follow, unfollow, errors };
};
