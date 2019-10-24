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
  /** 異常レスポンス */
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** パスワード変更API */
  const updatePassword = async () => {
    const url = API_ENDPOINT.USER_PASSWORD.replace("$1", userId);

    const body: IUpdatePasswordBody = {
      old_password: oldPassword,
      new_password: newPassword
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

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    updatePassword,
    errors
  };
};