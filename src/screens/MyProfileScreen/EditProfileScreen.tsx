import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  View
} from "native-base";
import axios, { CancelTokenSource } from "axios";
import { useNavigation } from "react-navigation-hooks";

// from app
import { IUserDetail } from "app/src/interfaces/api/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { useGlobalState } from "app/src/Store";
import appTextStyle from "app/src/styles/GeneralTextStyle";
import { IUpdateUserBody } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { Constants } from "expo";
import { handleError } from "app/src/utils/ApiUtil";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import { StyleSheet } from "react-native";
import { isEmpty } from "app/src/utils/CheckUtil";
import appStyle from "app/src/styles/GeneralStyle";

/**
 * プロフィール編集画面
 * @author itsukiyamada
 */
const EditProfileScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const loginUser = useGlobalState("loginUser");
  const [name, setName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [mailAddress, setMailAddress] = useState<string>("");
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

  /** ユーザー情報更新ボタン押下時の処理 */
  const onCompleteButtonPress = () => {
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
      isEmpty(sex) ||
      isEmpty(`${age}`) ||
      isEmpty(address)
    ) {
      return <CompleteButton title="ユーザー情報更新" disabled />;
    }

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const signal = axios.CancelToken.source();
      getUserDetail(signal);
      return () => {
        signal.cancel("Cancelling in Cleanup.");
      };
    }, []);

    const update = () => {
      setIsLoading(true);

      const body: IUpdateUserBody = {
        name: name,
        profile: profile,
        sex: sex,
        age: age,
        address: address,
        mail_address: mailAddress
      };

      axios
        .post(
          Constants.manifest.extra.apiEndpoint + "/users/" + loginUser.id,
          body
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

    /** ユーザー詳細取得 */
    const getUserDetail = (signal: CancelTokenSource) => {
      const url =
        Constants.manifest.extra.apiEndpoint + "/users/" + loginUser.id;

      axios
        .get(url, {
          cancelToken: signal.token
        })
        .then((response: { data: IUserDetail }) => {
          setName(response.data.name);
          setProfile(response.data.profile);
          setSex(response.data.sex);
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

    return <CompleteButton title="完了" onPress={onCompleteButtonPress} />;
  };
  return (
    <Container>
      <Content>
        <View style={appStyle.standardContainer} />
        <Form>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>名前</Label>
            <Input onChangeText={value => setName(value)} value={name} />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>自己紹介</Label>
            <Input onChangeText={value => setProfile(value)} value={profile} />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>メール</Label>
            <Input
              onChangeText={value => setMailAddress(value)}
              value={mailAddress}
            />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>性別</Label>
            <Input onChangeText={value => setSex(value)} value={sex} />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>年齢</Label>
            <Input onChangeText={value => setAge(+value)} value={`${age}`} />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>住まい</Label>
            <Input onChangeText={value => setAddress(value)} value={address} />
          </Item>
        </Form>
        <View style={appStyle.standardContainer}>{renderCompleteButton()}</View>
        <View style={appStyle.emptySpace} />
      </Content>
    </Container>
  );
};

export default EditProfileScreen;
