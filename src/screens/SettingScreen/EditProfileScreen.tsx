import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Form, View } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT } from "app/src/constants/Url";
import { IUserDetail } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { IUpdateUserBody } from "app/src/interfaces/api/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { CompleteButton } from "app/src/components/Button";
import { InputLabelForm } from "app/src/components/Form";
import { handleError, isEmpty } from "app/src/utils";

/**
 * プロフィール編集画面
 * @author itsukiyamada, kotatanaka
 */
const EditProfileScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const loginUser = useGlobalState("loginUser");
  const [name, setName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [mailAddress, setMailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getUserDetail(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** プロフィール更新 */
  const update = () => {
    setIsLoading(true);

    const url = API_ENDPOINT.USER.replace("$1", loginUser.id);

    const body: IUpdateUserBody = {
      name: name !== user.name ? name : undefined,
      profile: profile !== user.profile ? profile : undefined,
      age: age !== user.age ? age : undefined,
      address: address !== user.address ? address : undefined,
      mail_address: mailAddress !== user.mail_address ? mailAddress : undefined
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

  /** ユーザー詳細取得 */
  const getUserDetail = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.USER.replace("$1", loginUser.id);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IUserDetail }) => {
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

  if (isLoading) {
    return LoadingSpinner;
  }

  /** ユーザー情報更新ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
    update();
    navigate("top");
  };

  /**
   * 完了ボタンを描画する
   * 未入力がある場合は押せないようにする
   */
  const renderCompleteButton = () => {
    if (
      isEmpty(name) ||
      isEmpty(profile) ||
      isEmpty(mailAddress) ||
      isEmpty(`${age}`) ||
      isEmpty(address)
    ) {
      return <CompleteButton title="ユーザー情報更新" disabled />;
    }
    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };

  return (
    <Container>
      <Content>
        <Form>
          <InputLabelForm label="名前" value={name} setValue={setName} />
          <InputLabelForm
            label="自己紹介"
            value={profile}
            setValue={setProfile}
          />
          <InputLabelForm
            label="メール"
            value={mailAddress}
            setValue={setMailAddress}
          />
          <InputLabelForm label="年齢" numValue={age} setNumValue={setAge} />
          <InputLabelForm
            label="住まい"
            value={address}
            setValue={setAddress}
          />
        </Form>
        <View style={thisStyle.button}>{renderCompleteButton()}</View>
      </Content>
    </Container>
  );
};

export default EditProfileScreen;

const thisStyle = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: 50
  }
});
