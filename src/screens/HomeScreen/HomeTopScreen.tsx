import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Constants } from "expo";
import axios, { CancelTokenSource } from "axios";

// from app
import { PlanList } from "app/src/types/api/TPlan";
import { BadRequestError } from "app/src/types/api/TError";
import { LoadingSpinner, RefreshSpinner } from "app/src/components/Spinners";
import PlanCardList from "app/src/components/lists/PlanCardList";
import CreatePlanFab from "app/src/components/buttons/CreatePlanFab";
import { appTextStyle } from "app/src/styles/general-style";
import homeScreenStyle from "app/src/styles/home-screen-style";

/**
 * ホーム画面トップ
 * @author kotatanaka
 */
const HomeTopScreen: React.FC = () => {
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

  /** デートプラン一覧取得 */
  // TODO 自分のエリアで人気のデートプランを取得する
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
    <View style={homeScreenStyle.container}>
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

export default HomeTopScreen;
