import { StyleSheet, View } from "react-native";
import { Header, Text } from "native-base";

// from app
import { LoadingSpinner } from "app/src/components/Spinners";
import { HistorySwipeList } from "app/src/components/List";
import { appTextStyle } from "app/src/styles";
import { useDeleteHistory } from "app/src/hooks/useDeleteHistory";
import { useGetHistoryList } from "app/src/hooks/useGetHistoryList";
import { useGlobalState } from "app/src/Store";

/**
 * 検索履歴一覧画面
 * @author itsukiyamada
 */
const DeleteHistoryScreen: React.FC = () => {
  /**検索履歴一覧取得 */
  const { isLoading, histories } = useGetHistoryList("userId");

  /**検索履歴削除 */
  const { deleteHistory } = useDeleteHistory("userId");

  /** ログイン中のユーザー*/
  const loginUser = useGlobalState("loginUser");
  const userId = loginUser.id;

  /**ローディング */
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
