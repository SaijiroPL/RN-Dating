import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import axios, { CancelTokenSource } from "axios";

// from app
import globals from "app/src/globals";
import { PlanList, BadRequestError } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import { myPlanStyle } from "app/src/styles/myplan-screen-style";

/**
 * マイプラン画面トップ
 * @author kotatanaka
 */
const MyPlanTopScreen: React.FC = () => {
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

  /** ユーザーに紐付くデートプラン一覧取得 */
  const getPlanList = (signal: CancelTokenSource) => {
    axios
      .get(Constants.manifest.extra.apiEndpoint + "/plans", {
        params: {
          user_id: globals.loginUser.id
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

  return (
    <View style={myPlanStyle.container}>
      <Text>作成したデートプランの数 {plans.total}</Text>
      <PlanCardList planList={plans.plan_list} />
    </View>
  );
};

export default MyPlanTopScreen;
