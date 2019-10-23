import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUserDetail } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { IUpdateUserBody } from "app/src/interfaces/api/User";
import { handleError } from "app/src/utils";

/**
 * プロフィール編集(ユーザー情報取得&プロフィール更新)フック
 * @author itsukiyamada, kotatanaka
 * @param userId 対象のユーザーID
 */
export const useEditProfile = (userId: string) => {
  /** ユーザー名 */
  const [name, setName] = useState<string>("");
  /** 自己紹介文 */
  const [profile, setProfile] = useState<string>("");
  /** 年齢 */
  const [age, setAge] = useState<number>(0);
  /** 住所 */
  const [address, setAddress] = useState<string>("");
  /** メールアドレス */
  const [mailAddress, setMailAddress] = useState<string>("");
  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ユーザー情報取得正常レスポンス */
  const [user, setUser] = useState<IUserDetail>({
    user_id: "",
    name: "",
    profile: "",
    sex: "",
    age: 0,
    area: "",
    address: "",
    mail_address: "",
    user_attr: "",
    user_image_url: "",
    plan_count: 0,
    follow_count: 0,
    follower_count: 0
  });

  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** プロフィール更新 */
  const updateProfile = async () => {
    const url = API_ENDPOINT.USER.replace("$1", userId);

    // 変更がない項目はボディに含めない
    const body: IUpdateUserBody = {
      name: name !== user.name ? name : undefined,
      profile: profile !== user.profile ? profile : undefined,
      age: age !== user.age ? age : undefined,
      address: address !== user.address ? address : undefined,
      mail_address: mailAddress !== user.mail_address ? mailAddress : undefined
    };

    return await axios
      .put<IOK>(url, body)
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
   * ユーザー詳細取得
   * @param signal CancelTokenSource
   */
  const getUserDetail = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER.replace("$1", userId);

    axios
      .get<IUserDetail>(url, {
        cancelToken: signal.token
      })
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setProfile(response.data.profile);
        setAge(response.data.age);
        setAddress(response.data.address);
        setMailAddress(response.data.mail_address);
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
    errors
  };
};
