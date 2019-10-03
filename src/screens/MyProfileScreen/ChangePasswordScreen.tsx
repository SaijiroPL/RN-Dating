import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Form } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios, { CancelTokenSource } from "axios";

// from app
import InputFormFloating from "app/src/components/contents/InputFormFloating";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { isEmpty } from "app/src/utils/CheckUtil";
import appStyle from "app/src/styles/GeneralStyle";
import { IUpdataPassword } from "app/src/interfaces/api/User";
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

  const [old_Password, setOldPassword] = useState<string>("");
  const [new_Password, setNewPassword] = useState<string>("");
  const loginUser = useGlobalState("loginUser");
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const update = () => {
    setIsLoading(true);

    const body: IUpdataPassword = {
      new_Password: setNewPassword
    };

    axios
      .post(
        Constants.manifest.extra.apiEndpoint + "/users/" + loginUser.id,
      )
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
    // TODO パスワード変更APIを叩く
    if (new_Password === new_Password) {
      navigate("top");
    }
    setNewPassword("");
  };

  /**
   * 完了ボタンを描画する
   * 未入力がある場合は押せないようにする
   */
  const renderCompleteButton = () => {
    if (isEmpty(old_Password) || isEmpty(new_Password) || isEmpty(new_Password)) {
      return <CompleteButton title="完了" disabled />;
    }

    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };

  return (
    <View style={appStyle.standardContainer}>
      <Form style={{ flex: 3, justifyContent: "center" }}>
        <InputFormFloating
          label="現在のパスワード"
          value={old_Password}
          setValue={setOldPassword}
          }
        />
        <InputFormFloating
          label="新しいパスワード"
          value={new_Password}
          setValue={setNewPassword}
        />
        <InputFormFloating
          label="新しいパスワードの確認"
          value={new_Password}
          setValue={setNewPassword}
        />
      </Form>
      <View style={appStyle.standardContainer}>{renderCompleteButton()}</View>
      <View style={appStyle.emptySpace} />
    </View>
  );

export default ChangePasswordScreen;
