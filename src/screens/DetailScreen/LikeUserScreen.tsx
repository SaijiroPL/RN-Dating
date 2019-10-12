import React, { useState, useEffect } from "react";
import { useNavigationParam } from "react-navigation-hooks";
import { Container, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { API_ENDPOINT } from "app/src/constants/Url";
import { ILikeUserList } from "app/src/interfaces/api/Like";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import { LikeUserList } from "app/src/components/List";
import { handleError } from "app/src/utils";
import { appTextStyle } from "app/src/styles";

/**
 * デートプランお気に入り登録者一覧画面
 * @author kotatanaka
 */
const LikeUserScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [users, setUsers] = useState<ILikeUserList>({
    total: 0,
    liked_user_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getLikeUserList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプランお気に入り登録者一覧取得 */
  const getLikeUserList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.PLAN_LIKES.replace("$1", planId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: ILikeUserList }) => {
        setUsers(Object.assign(response.data));
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
      <Text style={appTextStyle.countText}>
        お気に入り登録者数: {users.total}
      </Text>
      <LikeUserList users={users.liked_user_list} />
    </Container>
  );
};

export default LikeUserScreen;
