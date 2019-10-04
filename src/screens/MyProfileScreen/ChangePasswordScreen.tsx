import React, { useState } from "react";
import { View } from "react-native";
import { Form } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";

// from app
import InputFormFloating from "app/src/components/contents/InputFormFloating";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { isEmpty } from "app/src/utils/CheckUtil";
import appStyle from "app/src/styles/GeneralStyle";
import { IUpdataPasswordBody } from "app/src/interfaces/api/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { useGlobalState, useDispatch } from "app/src/Store";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { Constants } from "expo";
import { handleError } from "app/src/utils/ApiUtil";

/**
 * パスワード変更画面
 * @author itsukiyamada
 */
const ChangePasswordScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const loginUser = useGlobalState("loginUser");
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const update = () => {
    setIsLoading(true);

    const body: IUpdataPasswordBody = {
      old_password: oldPassword,
      new_password: newPassword
    };

    axios
      .put(
        Constants.manifest.extra.apiEndpoint +
          "/users/" +
          loginUser.id +
          "/password"
      )
      .then((_response: { data: IOK }) => {
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
    // TODO パスワード変更APIを叩く
    if (newPassword === newPassword) {
      navigate("top");
    }
    setNewPassword("");
  };

  /**
   * 完了ボタンを描画する
   * 未入力がある場合は押せないようにする
   */
  const renderCompleteButton = () => {
    if (isEmpty(oldPassword) || isEmpty(newPassword) || isEmpty(newPassword)) {
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
          value={newPassword}
          setValue={setNewPassword}
        />
      </Form>
      <View style={appStyle.standardContainer}>{renderCompleteButton()}</View>
      <View style={appStyle.emptySpace} />
    </View>
  );
};

export default ChangePasswordScreen;
