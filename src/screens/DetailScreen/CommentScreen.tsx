import React, { useState, useEffect } from "react";
import { Constants } from "expo";
import { useNavigationParam } from "react-navigation-hooks";
import { Container, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { CommentList as TCommentList } from "app/src/types/api/TComment";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner } from "app/src/components/Spinners";
import CommentList from "app/src/components/lists/CommentList";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * コメント一覧画面
 * @author kotatanaka
 */
const CommentScreen: React.FC = () => {
  const planId = useNavigationParam("id");

  const [comments, setComments] = useState({
    total: 0,
    comment_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

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
      .then((response: { data: TCommentList }) => {
        setComments(Object.assign(response.data));
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
      <Text style={appTextStyle.countText}>{comments.total} 件のコメント</Text>
      <CommentList commentList={comments.comment_list} />
    </Container>
  );
};

export default CommentScreen;
