import { useState } from "react";
import axios from "axios";

// from app
import { useDispatch } from "app/src/Store";
import { ActionType } from "app/src/Reducer";
import { API_ENDPOINT } from "app/src/constants";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { ILogin } from "app/src/interfaces/api/User";
import { handleError } from "app/src/utils";

/**
 * ログインフック
 * @author kotatanaka
 */
export const useSignin = () => {
  /** グローバルステート更新関数 */
  const dispatch = useDispatch();

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /**
   * メールアドレスでログイン
   * @param mailAddress メールアドレス
   * @param password パスワード
   */
  const loginByEmail = async (mailAddress: string, password: string) => {
    const url = API_ENDPOINT.USERS_LOGIN;
    const body: ILogin = {
      mail_address: mailAddress,
      password: password
    };

    return await axios
      .post<IOK>(url, body)
      .then(response => {
        setLoginUser(response.data.id, "xxx");
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
   * ログインユーザーの永続化
   * @param id ユーザーID
   * @param name ユーザー名
   * @param imageUrl プロフィール画像URL
   */
  const setLoginUser = (id: string, name: string, imageUrl?: string) => {
    dispatch({
      type: ActionType.SET_LOGIN_USER,
      payload: {
        id: id,
        name: name,
        imageUrl: ""
      }
    });
  };

  return { loginByEmail, setLoginUser, errors };
};
