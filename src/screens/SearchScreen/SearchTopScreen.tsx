import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Constants } from "expo";
import { SearchBar } from "react-native-elements";
import axios, { CancelTokenSource } from "axios";
import { Ionicons } from "@expo/vector-icons";

// from app
import { PlanList, BadRequestError } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import { searchStyle } from "app/src/styles/search-screen-style";
import colors from "app/src/constants/colors";

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
  const renderSearchBar = () => {
    return (
      <SearchBar
        placeholder="検索"
        round={true}
        lightTheme={true}
        searchIcon={
          <Ionicons name="ios-search" size={26} color={colors.textTintColor} />
        }
        // TODO キャンセルボタンのカスタマイズ
        onChangeText={updateSearchWord}
        value={searchWord}
      />
    );
  };

  return (
    <View style={searchStyle.container}>
      {renderSearchBar()}
      <PlanCardList planList={plans.plan_list} />
    </View>
  );
};

export default SearchTopScreen;
