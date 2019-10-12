import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { API_ENDPOINT, COLOR } from "app/src/constants";
import { IPlanList } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import { Indicator, RefreshSpinner } from "app/src/components/Spinners";
import { SearchFormBar } from "app/src/components/Form";
import { PlanCardList } from "app/src/components/List";
import { handleError } from "app/src/utils/ApiUtil";
import appTextStyle from "app/src/styles/GeneralTextStyle";

/**
 * 検索画面トップ
 * @author kotatanaka
 */
const SearchTopScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    return () => {
      signal.cancel("Cancelling in Cleanup.");
    };
  }, []);

  /** デートプラン検索API */
  const searchPlanList = () => {
    if (searchWord === "") {
      return;
    }

    if (!isRefreshing) {
      setIsLoading(true);
    }

    const signal = axios.CancelToken.source();
    const url = API_ENDPOINT.PLANS_SEARCH;

    axios
      .get(url, {
        params: {
          keyword: searchWord,
          user_id: loginUser.id
        },
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
          setIsLoading(false);
        }
      });
  };

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    searchPlanList();
    setRefreshing(false);
  };

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
                ? "プランが見つかりません。"
                : `検索結果: ${plans.total} 件`}
            </Text>
          </View>
          <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
            <PlanCardList planList={plans.plan_list} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: COLOR.backgroundColor
  },
  planCount: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  spinner: {
    flex: 1
  }
});

export default SearchTopScreen;
