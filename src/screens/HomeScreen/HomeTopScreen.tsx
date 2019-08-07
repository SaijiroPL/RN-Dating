import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import { Spinner } from "native-base";
import axios, { CancelTokenSource } from "axios";

// from app
import { PlanList } from "app/src/types/api/TPlan";
import { BadRequestError } from "app/src/types/api/TError";
import PlanCardList from "app/src/components/lists/PlanCardList";
import CreatePlanFab from "app/src/components/buttons/CreatePlanFab";
import { homeStyle } from "app/src/styles/home-screen-style";

/**
 * ホーム画面トップ
 * @author kotatanaka
 */
const HomeTopScreen: React.FC = () => {
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

  if (isLoading) {
    return <Spinner color="orange" style={{ flex: 1 }} />;
  }

  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.planCountText}>
        デートプランの数: {plans.total}
      </Text>
      <PlanCardList planList={plans.plan_list} />
      <CreatePlanFab />
    </View>
  );
};

export default HomeTopScreen;
