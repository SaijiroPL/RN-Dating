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
    // TODO API繋ぎこみ

    // FIXME APIを繋ぎこんだら下記サンプルデータは削除
    const SAMPLE_HISTORIES: IHistoryList = {
      total: 2,
      history_list: [
        {
          history_id: 1,
          word: "デート",
          search_date: "xxx"
        },
        {
          history_id: 2,
          word: "おすすめ",
          search_date: "xxx"
        }
      ]
    };
    setHistories(SAMPLE_HISTORIES);
    setIsLoading(false);
  };

  /** 検索履歴削除 */
  const deleteHistory = (id: number) => {
    // TODO API繋ぎこみ
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
