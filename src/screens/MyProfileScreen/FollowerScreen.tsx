import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { IFollowerList } from "app/src/interfaces/api/Follow";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import FollowList from "app/src/components/lists/FollowList";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * フォロワーリスト一覧画面
 * @author kotatanaka
 */
const FollowScreen: React.FC = () => {
  const userId = useNavigationParam("id");

  const [followers, setFollowers] = useState<IFollowerList>({
    total: 0,
    follower_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
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
      Constants.manifest.extra.apiEndpoint + "/users/" + userId + "/followers";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IFollowerList }) => {
        setFollowers(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: IApiError) => {
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
      <Text style={appTextStyle.countText}>
        フォロワー数: {followers.total}
      </Text>
      <FollowList follows={followers.follower_list} />
    </Container>
  );
};

export default FollowScreen;
