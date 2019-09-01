import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Constants } from "expo";
import axios, { CancelTokenSource } from "axios";

// from app
import { useGlobalState } from "app/src/Store";
import { PlanList } from "app/src/types/api/TPlan";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import PlanCardList from "app/src/components/lists/PlanCardList";
import { appTextStyle } from "app/src/styles/general-style";
import myPlanScreenStyle from "app/src/styles/myplan-screen-style";

/**
 * マイプラン画面トップ
 * @author kotatanaka
 */
const MyPlanTopScreen: React.FC = () => {
  const loginUser = useGlobalState("loginUser");

  const [plans, setPlans] = useState<PlanList>({
    total: 0,
    plan_list: []
  });
  const [errors, setErrors] = useState<BadRequestError>({
    code: 0,
    message: "",
    detail_massage: []
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
    <View style={myPlanScreenStyle.container}>
      <Text style={appTextStyle.countText}>
        作成したデートプランの数: {plans.total}
      </Text>
      <ScrollView refreshControl={RefreshSpinner(isRefreshing, onRefresh)}>
        <PlanCardList planList={plans.plan_list} myPlan />
      </ScrollView>
    </View>
  );
};

export default MyPlanTopScreen;
