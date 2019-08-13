import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container, Spinner } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { FollowList as TFollowList } from "app/src/types/api/TFollow";
import { BadRequestError } from "app/src/types/api/TError";
import FollowList from "app/src/components/lists/FollowList";
import appStyle from "app/src/styles/common-style";
import { profileStyle } from "app/src/styles/profile-screen-style";

/**
 * フォローリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  const userId = useNavigationParam("id");

  const [follows, setFollows] = useState({
    total: 0,
    follow_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getFollowList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** フォローリスト取得 */
  const getFollowList = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/users/" + userId + "/follows";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: TFollowList }) => {
        setFollows(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          console.log("API Error: " + error.message);
        }
      });
  };

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

  return (
    <Container>
      <Text style={appStyle.countText}>フォロー数: {follows.total} </Text>
      <FollowList follows={follows.follow_list} />
    </Container>
  );
};

export default FollowScreen;
