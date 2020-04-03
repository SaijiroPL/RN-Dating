import React from 'react';
import { View } from 'react-native';
import { Header, Text } from 'native-base';

// from app
import { LoadingSpinner } from 'app/src/components/Spinners';
import { HistorySwipeList } from 'app/src/components/List';
import { appTextStyle } from 'app/src/styles';
import { useGetHistoryList } from 'app/src/hooks';
import { useGlobalState } from 'app/src/Store';

/**
 * 検索履歴一覧画面
 * @author itsukiyamada
 */
const DeleteHistoryScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** 検索履歴一覧取得・検索履歴削除 */
  const { histories, deleteHistory } = useGetHistoryList(loginUser.id);

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
