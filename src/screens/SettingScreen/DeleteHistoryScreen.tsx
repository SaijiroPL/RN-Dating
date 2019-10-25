import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header, Text } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { IHistoryList } from "app/src/interfaces/api/History";
import { IApiError } from "app/src/interfaces/api/Error";
import { LoadingSpinner } from "app/src/components/Spinners";
import { HistorySwipeList } from "app/src/components/List";
import { appTextStyle } from "app/src/styles";
import { handleError } from "app/src/utils";
import { API_ENDPOINT } from "app/src/constants";

/**
 * 検索履歴一覧画面
 * @author itsukiyamada
 */
const DeleteHistoryScreen: React.FC = () => {
  const [histories, setHistories] = useState<IHistoryList>({
    total: 0,
    history_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** ライフサイクル */
  useEffect(() => {
    const signal = axios.CancelToken.source();
    getHistoryList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** 検索履歴一覧取得 */
  const getHistoryList = (signal: CancelTokenSource) => {
    const url = API_ENDPOINT.HISTORY.replace("$1", userId);

    axios
      .get(url, {
        cancelToken: signal.token
      })
      .then((response: { data: IHistoryList }) => {
        setHistories(Object.assign(response.data));
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
        setHistories(histories);
        setIsLoading(false);
      });

    /** 検索履歴削除 */
    const deleteDeleteHistory = async (id: number) => {
      const url = API_ENDPOINT.HISTORY_DELETE;

      return await axios
        .delete<IDeleteHistory>(url)
        .then(response => {
          return response.data.user_id;
        })
        .catch(error => {
          const apiError = handleError(error);
          if (apiError) {
            setErrors(apiError);
          }
        });
    };
  };

  if (isLoading) {
    return LoadingSpinner;
  }

  // TODO 件数を表示する?
  return (
    <View>
      <Header>
        <Text style={appTextStyle.defaultText}>検索履歴一覧</Text>
      </Header>
      <HistorySwipeList
        histories={histories.history_list}
        onDelete={deleteHistory}
      />
    </View>
  );
};

export default DeleteHistoryScreen;
