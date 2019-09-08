import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Constants } from "expo";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { IPlanList } from "app/src/interfaces/api/Plan";
import { IApiError } from "app/src/interfaces/api/Error";
import Colors from "app/src/constants/Colors";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import PlanCardList from "app/src/components/lists/PlanCardList";
import { handleError } from "app/src/utils/ApiUtil";
import { appTextStyle } from "app/src/styles/general-style";

/**
 * マイプラン画面トップ
 * @author kotatanaka
 */
const MyPlanTopScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");

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

  /** ユーザーに紐付くデートプラン一覧取得 */
  const getPlanList = (signal: CancelTokenSource) => {
    axios
      .get(Constants.manifest.extra.apiEndpoint + "/plans", {
        params: {
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
        }
        setIsLoading(false);
      });
  };

  /** プルリロード */
  const onRefresh = () => {
    setRefreshing(true);
    getPlanList(axios.CancelToken.source());
    setRefreshing(false);
  };

  if (isLoading) {
    return LoadingSpinner;
  }

  return (
    <View style={thisStyle.container}>
      <Text style={appTextStyle.countText}>
        作成したデートプランの数: {plans.total}
      </Text>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} myPlan />
      </ScrollView>
    </View>
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center"
  }
});

export default MyPlanTopScreen;
