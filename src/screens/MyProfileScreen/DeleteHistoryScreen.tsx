import React, { useState } from "react";
import { View, Text } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
// from app
import { IHistoryList } from "app/src/interfaces/api/History";
import { IApiError } from "app/src/interfaces/api/Error";

/**
 * 検索履歴一覧画面
 * @author itsukiyamada
 */
const DeleteHistoryScreen: React.FC = () => {
  const [historys, sethistorys] = useState<IHistoryList>({
    total: 0,
    history_list: ["んぢいfs"]
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <SwipeListView
      data={historys.history_list}
      renderItem={(data: { item: React.ReactNode }) => (
        <View
          style={{ backgroundColor: "gray", padding: 15, borderBottomWidth: 1 }}
        >
          <Text> {data.item}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "red",
            padding: 15,
            borderBottomWidth: 1
          }}
        >
          <Text>削除する</Text>
        </View>
      )}
      rightOpenValue={-10}
    />
  );
};

export default DeleteHistoryScreen;
