import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// from app
import { COLOR, LAYOUT } from 'app/src/constants';
import { Indicator } from 'app/src/components/Spinners';
import { SearchFormBar } from 'app/src/components/Form';
import { PlanCardList } from 'app/src/components/List';
import { useSearchPlanList } from 'app/src/hooks';
import { appTextStyle } from 'app/src/styles';
import { useNavigation } from '@react-navigation/native';

/** デートプラン検索画面 */
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

  const { navigate } = useNavigation();

  return (
    <View style={thisStyle.container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 8 }}>
          <SearchFormBar
            value={searchWord}
            setValue={setSearchWord}
            onSearch={searchPlanList}
          />
        </View>
        <View
          style={{
            flex: 1.2,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={thisStyle.spotButton}
            onPress={() => {
              console.log('toSpot');
              navigate('CreateSpot');
            }}
          >
            <FontAwesome5 name="map-marker" size={24} color={COLOR.greyColor} />
            <FontAwesome5 name="plus" size={10} color={COLOR.greyColor} />
          </TouchableOpacity>
        </View>
      </View>
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
          <PlanCardList
            planList={plans.plan_list}
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        </View>
      )}
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
  spotButton: {
    backgroundColor: COLOR.tintColor,
    width: LAYOUT.window.width * 0.1,
    height: LAYOUT.window.width * 0.1,
    // padding: 5,
    borderRadius: LAYOUT.window.width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: LAYOUT.window.width * 0.01,
    marginRight: LAYOUT.window.width * 0.01,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SearchScreen;
