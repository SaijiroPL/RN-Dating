import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// from app
import { COLOR } from 'app/src/constants';
import { LoadingSpinner, RefreshSpinner } from 'app/src/components/Spinners';
import { PlanCardList } from 'app/src/components/List';
import { CreatePlanFab } from 'app/src/components/Button';
import { useGetPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';

/**
 * ホーム画面トップ
 * @author kotatanaka
 */
const HomeScreen: React.FC = () => {
  /** デートプラン一覧取得 */
  const {
    isPlanListLoading,
    plans,
    errors,
    isRefreshing,
    onRefresh,
  } = useGetPlanList();

  /** ローディング */
  if (isPlanListLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      <Text style={appTextStyle.countText}>
        デートプランの数: {plans.total}
      </Text>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} />
      </ScrollView>
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
