import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// from app
import { useGlobalState } from 'app/src/Store';
import { COLOR } from 'app/src/constants';
import { InformationList } from 'app/src/components/List';
import { useGetInformationList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/** 運営からのお知らせ一覧画面 */
const InformationScreen: React.FC = () => {
  /** ログイン中のユーザー */
  const loginUser = useGlobalState('loginUser');

  /** 運営からのお知らせ一覧取得 */
  const { isRefreshing, onRefresh, information } = useGetInformationList(
    loginUser.id,
  );

  return (
    <View style={thisStyle.container}>
      {information.information_list.length ? (
        <InformationList
          informationList={information.information_list}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <Text style={appTextStyle.defaultText}>
          運営からのお知らせはありません。
        </Text>
      )}
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
  },
});

export default InformationScreen;
