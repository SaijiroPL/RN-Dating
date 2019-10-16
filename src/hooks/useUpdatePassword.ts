import { useState } from "react";
import axios from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUpdatePasswordBody } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { handleError } from "app/src/utils";

/**
 * パスワード変更フック
 * @author itsukiyamada, kotatanaka
 * @param userId 対象のユーザーID
 */
export const useUpdatePassword = (userId: string) => {
  /** 現在のパスワード */
  const [oldPassword, setOldPassword] = useState<string>("");
  /** 新しいパスワード */
  const [newPassword, setNewPassword] = useState<string>("");
  /** 新しいパスワードの確認 */
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** パスワード変更API */
  const updatePassword = async () => {
    setIsLoading(true);

    const url = API_ENDPOINT.USER_PASSWORD.replace("$1", userId);

    const body: IUpdatePasswordBody = {
      old_password: oldPassword,
      new_password: newPassword
    };

    await axios
      .put<IOK>(url, body)
      .then(response => {
        setIsLoading(false);
      })
      .catch(error => {
        handleError(error);
        if (error.response.state === 400) {
          setErrors(error.response.data);
        }
        setIsLoading(false);
      });
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isLoading,
    errors,
    updatePassword
  };
};
