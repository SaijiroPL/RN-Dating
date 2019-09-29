import React, { useState, useEffect } from "react";
import { Container, Content, Form, Item, Input, Label } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { IUserDetail } from "app/src/interfaces/api/User";
import { LoadingSpinner } from "app/src/components/Spinners";
import { useGlobalState } from "app/src/Store";
import appTextStyle from "app/src/styles/GeneralTextStyle";
import { IUpdataUserBody } from "app/src/interfaces/api/User";
import { IOK } from "app/src/interfaces/api/Success";
import { IApiError } from "app/src/interfaces/api/Error";
import { Constants } from "expo";
import { handleError } from "app/src/utils/ApiUtil";

/**
 * プロフィール編集画面
 * @author itsukiyamada
 */
const EditProfileScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");
  const [name, setName] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [area, setArea] = useState<string>("");
  const [mailAddress, setMailAddress] = useState<string>("");
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });

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

    const body: IUpdataUserBody = {
      name: name,
      sex: sex,
      age: age,
      area: area,
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
    const url = Constants.manifest.extra.apiEndpoint + "/users/" + loginUser.id;

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IUserDetail }) => {
        setName(response.data.name);
        setSex(response.data.sex);
        setAge(response.data.age);
        setArea(response.data.area);
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

  return (
    <Container>
      <Content>
        <Form>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>名前</Label>
            <Input onChangeText={value => setName(value)} value={name} />
          </Item>
          <Item inlineLabel>
            <Label style={appTextStyle.standardText}>自己紹介</Label>
            <Input />
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
            <Input onChangeText={value => setArea(value)} value={area} />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default EditProfileScreen;
