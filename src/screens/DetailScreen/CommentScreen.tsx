import React, { useState, useEffect } from "react";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { ICommentList } from "app/src/interfaces/api/Comment";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import CommentList from "app/src/components/lists/CommentList";
import { handleError } from "app/src/utils/ApiUtil";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * コメント一覧画面
 * @author kotatanaka
 */
const CommentScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [comments, setComments] = useState<ICommentList>({
    total: 0,
    comment_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getCommentList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** コメント一覧取得 */
  const getCommentList = (signal: CancelTokenSource) => {
    const url =
      Constants.manifest.extra.apiEndpoint + "/plans/" + planId + "/comments";

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: ICommentList }) => {
        setComments(Object.assign(response.data));
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
      <Text style={appTextStyle.countText}>{comments.total} 件のコメント</Text>
      <CommentList commentList={comments.comment_list} />
    </Container>
  );
};

export default CommentScreen;
