import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// from app
import { COLOR } from 'app/src/constants';
import { Indicator, RefreshSpinner } from 'app/src/components/Spinners';
import { SearchFormBar } from 'app/src/components/Form';
import { PlanCardList } from 'app/src/components/List';
import { useSearchPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';
import { CreateSpotFab } from 'app/src/components/Button/CreateSpotFab';

/**
 * デートプラン検索画面
 * @author kotatanaka
 */
const SearchScreen: React.FC = () => {
  /** デートプラン検索 */
  const {
    isLoading,
    searchWord,
    setSearchWord,
    searchPlanList,
    plans,
    isRefreshing,
    onRefresh,
  } = useSearchPlanList();

  return (
    <View style={thisStyle.container}>
      <SearchFormBar
        value={searchWord}
        setValue={setSearchWord}
        onSearch={searchPlanList}
      />
      {isLoading ? (
        <View>{Indicator}</View>
      ) : (
        <View>
          <View style={thisStyle.planCount}>
            <Text style={appTextStyle.countText}>
              {plans.total === 0
                ? 'プランが見つかりません。'
                : `検索結果: ${plans.total} 件`}
            </Text>
          </View>
          <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
            <PlanCardList planList={plans.plan_list} />
          </ScrollView>
        </View>
      )}
      {/* TODO スポット追加画面を左上に配置したい */}
      <CreateSpotFab />
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor,
  },
  planCount: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  spinner: {
    flex: 1,
  },
});

export default SearchScreen;
