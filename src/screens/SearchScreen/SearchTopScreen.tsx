import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import { Spinner } from "native-base";
import { SearchBar } from "react-native-elements";
import axios, { CancelTokenSource } from "axios";
import { Ionicons } from "@expo/vector-icons";

// from app
import { PlanList } from "app/src/types/api/TPlan";
import { BadRequestError } from "app/src/types/api/TError";
import PlanCardList from "app/src/components/lists/PlanCardList";
import appStyle from "app/src/styles/common-style";
import { searchStyle } from "app/src/styles/search-screen-style";
import Colors from "app/src/constants/Colors";

/**
 * 検索画面トップ
 * @author kotatanaka
 */
const SearchTopScreen: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [plans, setPlans] = useState({
    total: 0,
    plan_list: []
  });
  const [errors, setErrors] = useState({
    code: 0,
    message: "",
    detail_massage: []
  });
  const [isLoading, setIsLoading] = useState(true);

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
      .then((response: { data: PlanList }) => {
        setPlans(Object.assign(response.data));
        setIsLoading(false);
      })
      .catch((error: BadRequestError) => {
        setErrors(Object.assign(error));
        setIsLoading(false);
        if (axios.isCancel(error)) {
          console.log("Request Cancelled: " + error.message);
        } else {
          console.log("API Error: " + error.message);
        }
      });
  };

  const updateSearchWord = (searchWord: string) => {
    setSearchWord(searchWord);
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
        containerStyle={searchStyle.searchBar}
        inputContainerStyle={searchStyle.searchInput}
      />
    );
  };

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

  return (
    <View style={searchStyle.container}>
      {renderSearchBar()}
      <View style={searchStyle.planCount}>
        <Text style={appStyle.countText}>検索結果: {plans.total} 件</Text>
      </View>
      <PlanCardList planList={plans.plan_list} />
    </View>
  );
};

export default SearchTopScreen;
