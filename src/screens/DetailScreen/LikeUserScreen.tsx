import React, { useState, useEffect } from "react";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { LikeUserList as TLikeUserList } from "app/src/types/api/TLike";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner } from "app/src/components/Spinners";
import LikeUserList from "app/src/components/lists/LikeUserList";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * デートプランお気に入り登録者一覧画面
 * @author kotatanaka
 */
const LikeUserScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [users, setUsers] = useState({
    total: 0,
    liked_user_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getLikeUserList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプランお気に入り登録者一覧取得 */
  const getLikeUserList = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/plans/" + planId + "/likes";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: TLikeUserList }) => {
        setUsers(Object.assign(response.data));
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
      <Text style={appTextStyle.countText}>
        お気に入り登録者数: {users.total}
      </Text>
      <LikeUserList users={users.liked_user_list} />
    </Container>
  );
};

export default LikeUserScreen;
