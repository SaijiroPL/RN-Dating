import React, { useState } from "react";
import { View } from "react-native";
import { Form } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUpdatePasswordBody } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import InputFormFloating from "app/src/components/contents/InputFormFloating";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { isEmpty } from "app/src/utils/CheckUtil";
import appStyle from "app/src/styles/GeneralStyle";
import { handleError } from "app/src/utils/ApiUtil";
/**
 * パスワード変更画面
 * @author itsukiyamada
 */
const ChangePasswordScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const loginUser = useGlobalState("loginUser");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  const update = () => {
    setIsLoading(true);

    const url = API_ENDPOINT.USER_PASSWORD.replace("$1", loginUser.id);

    const body: IUpdatePasswordBody = {
      old_password: oldPassword,
      new_password: newPassword
    };

    axios
      .put(url, body)
      .then((response: { data: IOK }) => {
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

  if (isLoading) {
    return LoadingSpinner;
  }

  /** 完了ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    if (newPassword === confirmNewPassword) {
      update();
      navigate("top");
    }
    setNewPassword("");
    setConfirmNewPassword("");
  };

  /**
   * 完了ボタンを描画する
   * 未入力がある場合は押せないようにする
   */
  const renderCompleteButton = () => {
    if (
      isEmpty(oldPassword) ||
      isEmpty(newPassword) ||
      isEmpty(confirmNewPassword)
    ) {
      return <CompleteButton title="完了" disabled />;
    }

    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };

  return (
    <View style={appStyle.standardContainer}>
      <Form style={{ flex: 3, justifyContent: "center" }}>
        <InputFormFloating
          label="現在のパスワード"
          value={oldPassword}
          setValue={setOldPassword}
        />
        <InputFormFloating
          label="新しいパスワード"
          value={newPassword}
          setValue={setNewPassword}
        />
        <InputFormFloating
          label="新しいパスワードの確認"
          value={confirmNewPassword}
          setValue={setConfirmNewPassword}
        />
      </Form>
      <View style={appStyle.standardContainer}>{renderCompleteButton()}</View>
      <View style={appStyle.emptySpace} />
    </View>
  );
};

export default ChangePasswordScreen;
