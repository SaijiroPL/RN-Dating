import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Constants } from "expo";
import { SearchBar } from "react-native-elements";
import axios, { CancelTokenSource } from "axios";
import { Ionicons } from "@expo/vector-icons";

// from app
import { IPlanList } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import Colors from "app/src/constants/Colors";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import PlanCardList from "app/src/components/lists/PlanCardList";
import { handleError } from "app/src/utils/ApiUtil";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * 検索画面トップ
 * @author kotatanaka
 */
const SearchTopScreen: React.FC = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [plans, setPlans] = useState<IPlanList>({
    total: 0,
    plan_list: []
  });
  const [errors, setErrors] = useState<IApiError>({
    code: 0,
    message: "",
    detail_message: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    getPlanList(signal);
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプラン検索APIに置き換える */
  const getPlanList = (signal: CancelTokenSource) => {
    axios
      .get(Constants.manifest.extra.apiEndpoint + "/plans", {
        cancelToken: signal.token
      })
      .then((response: { data: IPlanList }) => {
        setPlans(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          handleError(error);
          if (error.response.stats === 400) {
            setErrors(error.response.data);
          }
        }
        setIsLoading(false);
      });
  };

  /** 検索ワードの更新 */
  const updateSearchWord = (searchWord: string) => {
    setSearchWord(searchWord);
  };

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    getPlanList(axios.CancelToken.source());
    setRefreshing(false);
  };

  /** 検索バーを描画する */
  // TODO 入力文字のクリア
  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="検索"
        round
        lightTheme
        searchIcon={
          <Ionicons name="ios-search" size={26} color={Colors.textTintColor} />
        }
        clearIcon={
          <Ionicons name="ios-close" size={26} color={Colors.textTintColor} />
        }
        onChangeText={searchWord => updateSearchWord(searchWord)}
        onClear={() => updateSearchWord("")}
        value={searchWord}
        containerStyle={thisStyle.searchBar}
        inputContainerStyle={thisStyle.searchInput}
      />
    );
  };

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      {renderSearchBar()}
      <View style={thisStyle.planCount}>
        <Text style={appTextStyle.countText}>検索結果: {plans.total} 件</Text>
      </View>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} />
      </ScrollView>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor
  },
  searchBar: {
    backgroundColor: "white",
    shadowColor: "#ccc",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  searchInput: {
    backgroundColor: "#eee"
  },
  planCount: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default SearchTopScreen;
