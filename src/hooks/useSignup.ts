import { useState, useCallback } from 'react';
import axios from 'axios';

// from app
import { useDispatch, useGlobalState } from 'app/src/Store';
import { ActionType } from 'app/src/Reducer';
import { API_ENDPOINT } from 'app/src/constants';
import { IOK } from 'app/src/interfaces/api/Success';
import { IApiError } from 'app/src/interfaces/api/Error';
import { ICreateUserBody } from 'app/src/interfaces/api/User';
import { getAge, handleError } from 'app/src/utils';

/**
 * ユーザー登録フック
 * @author kotatanaka
 */
export const useSignup = () => {
  /** ユーザー登録に必要な情報 */
  const registerUser = useGlobalState('registerUser');

  /** グローバルステート更新関数 */
  const dispatch = useDispatch();

  /** ユーザー名 */
  const [name, setName] = useState<string>('');

  /** 男性かどうか */
  const [isMan, setMan] = useState<boolean>(false);

  /** 女性かどうか */
  const [isWoman, setWoman] = useState<boolean>(false);

  /** 生年月日 */
  const [birthday, setBirthday] = useState<string>('1995-01-01');

  /** 都道府県 */
  const [prefecture, setPrefecture] = useState<string>('');

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>();

  /** ユーザー登録 */
  const createUser = async (): Promise<string | undefined> => {
    const url = API_ENDPOINT.USERS;

    const body: ICreateUserBody = {
      name,
      sex: isMan ? 'man' : 'woman',
      age: getAge(birthday),
      area: prefecture,
      mail_address: registerUser.mailAddress,
      password: registerUser.password,
    };

    try {
      const { data } = await axios.post<IOK>(url, body);
      setErrors({ code: 0, message: '', detail_message: [] });

      return data.id;
    } catch (err) {
      const apiError = handleError(err);
      if (apiError) {
        setErrors(apiError);
      }
    }
  };

  /**
   * ユーザー登録に必要な情報の永続化
   * @param mailAddress メールアドレスう
   * @param password パスワード
   */
  const setRegisterUserParts = useCallback(
    (mailAddress: string, password: string) => {
      dispatch({
        type: ActionType.SET_REGISTER_USER,
        payload: {
          mailAddress,
          password,
        },
      });
    },
    [],
  );

  return {
    setRegisterUserParts,
    name,
    setName,
    isMan,
    setMan,
    isWoman,
    setWoman,
    birthday,
    setBirthday,
    prefecture,
    setPrefecture,
    createUser,
    errors,
  };
};
