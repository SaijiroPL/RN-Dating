import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { FollowList as TFollowList } from "app/src/types/api/TFollow";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner } from "app/src/components/Spinners";
import FollowList from "app/src/components/lists/FollowList";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * フォローリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  const userId = useNavigationParam("id");

  const [follows, setFollows] = useState<TFollowList>({
    total: 0,
    follow_list: []
  });
  const [errors, setErrors] = useState<BadRequestError>({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    return LoadingSpinner;
  }

  return (
    <Container>
      <Text style={appTextStyle.countText}>フォロー数: {follows.total}</Text>
      <FollowList follows={follows.follow_list} />
    </Container>
  );
};

export default FollowScreen;
