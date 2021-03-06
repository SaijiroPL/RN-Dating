import { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';

// from app
import { API_ENDPOINT } from 'app/src/constants/Url';
import { IUserDetail, IUpdateUserBody } from 'app/src/interfaces/api/User';
import { IOK } from 'app/src/interfaces/api/Success';
import { IApiError } from 'app/src/interfaces/api/Error';

import { handleError } from 'app/src/utils';

/**
 * プロフィール編集(ユーザー情報取得&プロフィール更新)フック
 * @param userId 対象のユーザーID
 */
export const useEditProfile = (userId: string) => {
  /** ユーザー名 */
  const [name, setName] = useState<string>('');
  /** 自己紹介文 */
  const [profile, setProfile] = useState<string>('');
  /** 年齢 */
  const [age, setAge] = useState<number>(0);
  /** 住所 */
  const [address, setAddress] = useState<string>('');
  /** メールアドレス */
  const [mailAddress, setMailAddress] = useState<string>('');
  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  /** ユーザー情報取得正常レスポンス */
  const [user, setUser] = useState<IUserDetail>({
    user_id: '',
    name: '',
    profile: '',
    sex: '',
    age: 0,
    area: '',
    address: '',
    mail_address: '',
    user_attr: '',
    user_image_url: '',
    plan_count: 0,
    follow_count: 0,
    follower_count: 0,
    is_follow: false,
    status: 'public',
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: '',
    detail_message: [],
  });

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);

    return () => {
      signal.cancel('Cancelling in Cleanup.');
    };
  }, []);

  /** プロフィール更新 */
  const updateProfile = async (): Promise<boolean> => {
    const url = API_ENDPOINT.USER.replace('$1', userId);

    // 変更がない項目はボディに含めない
    const body: IUpdateUserBody = {
      name: name !== user.name ? name : undefined,
      profile: profile !== user.profile ? profile : undefined,
      age: age !== user.age ? age : undefined,
      address: address !== user.address ? address : undefined,
      mail_address: mailAddress !== user.mail_address ? mailAddress : undefined,
      status: !isPrivate ? 'public' : 'private',
    };

    try {
      await axios.put<IOK>(`${url}/status`, {
        status: body.status,
      });
    } catch (e) {
      console.log(e.messge);
    }
    try {
      await axios.put<IOK>(url, body);
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
   * ユーザー詳細取得
   * @param signal CancelTokenSource
   */
  const getUserDetail = async (signal: CancelTokenSource): Promise<void> => {
    const url = API_ENDPOINT.USER.replace('$1', userId);

    try {
      const { data } = await axios.get<IUserDetail>(url, {
        params: {
          me_user_id: userId,
        },
        cancelToken: signal.token,
      });

      console.log('User detail:', data);

      setUser(data);
      setName(data.name);
      setProfile(data.profile);
      setAge(data.age);
      setAddress(data.address);
      setMailAddress(data.mail_address);
      setIsPrivate(data.status === 'private');
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

  return {
    name,
    setName,
    profile,
    setProfile,
    age,
    setAge,
    address,
    setAddress,
    mailAddress,
    setMailAddress,
    updateProfile,
    isLoading,
    errors,
    isPrivate,
    setIsPrivate,
  };
};
