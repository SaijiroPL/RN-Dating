import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';

// from app
import { COLOR } from 'app/src/constants';
import { LoadingSpinner } from 'app/src/components/Spinners';
import { PlanCardList } from 'app/src/components/List';
import { CreatePlanFab } from 'app/src/components/Button';
import { useGetPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';
import axios from 'axios';

/** ホーム画面トップ */
const HomeScreen: React.FC = () => {
  /** デートプラン一覧取得 */
  const {
    isPlanListLoading,
    plans,
    isRefreshing,
    onRefresh,
  } = useGetPlanList();

  /** ローディング */
  if (isPlanListLoading) {
    return LoadingSpinner;
  }

  // if (true) {
  //   ToastAndroid.showWithGravityAndOffset(
  //     'プラソを保存しました。',
  //     ToastAndroid.SHORT,
  //     ToastAndroid.CENTER,
  //     25,
  //     50
  //   );
  // }

  return (
    <View style={thisStyle.container}>
      <Text style={appTextStyle.countText}>
        デートプランの数: {plans.total}
      </Text>
      <PlanCardList
        planList={plans.plan_list}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
        myPlan={true}
      />
      <CreatePlanFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
