import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// from app
import { useGlobalState } from 'app/src/Store';
import { COLOR } from 'app/src/constants';
import { RefreshSpinner } from 'app/src/components/Spinners';
import { InformationList } from 'app/src/components/List';
import { useGetInformationList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/**
 * 運営からのお知らせ一覧画面
 * @author kotatanaka
 */
const InformationScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** 運営からのお知らせ一覧取得 */
  const { isRefreshing, onRefresh, information } = useGetInformationList(
    loginUser.id,
  );

  return (
    <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
      <View style={thisStyle.container}>
        {information.information_list.length ? (
          <InformationList informationList={information.information_list} />
        ) : (
          <Text style={appTextStyle.defaultText}>
            運営からのお知らせはありません。
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
  },
});

export default InformationScreen;
