import React from "react";
import { Text, View } from "react-native";
import { Constants } from "expo";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import axiosBase from "axios";

// from app
import globals from "app/src/globals";
import { PlanList, BadRequestError } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import { myPlanStyle } from "app/src/styles/myplan-screen-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  plans: PlanList;
  errors: BadRequestError;
}

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/plans"
});

/**
 * マイプラン画面トップ
 * @author kotatanaka
 */
export default class MyPlanTopScreen extends React.Component<Props> {
  public state: State = {
    plans: { total: 0, plan_list: [] },
    errors: { code: 0, message: "", detail_massage: [] }
  };

  componentDidMount() {
    this.getPlanList();
  }

  /** ユーザーに紐付くデートプラン一覧取得 */
  getPlanList() {
    axios
      .get("", {
        params: {
          user_id: globals.loginUser.id
        }
      })
      .then((response: { data: PlanList }) => {
        this.setState({ plans: response.data });
      })
      .catch((error: BadRequestError) => {
        this.setState({ errors: error });
      });
  }

  render() {
    const { navigation } = this.props;
    const { plans } = this.state;

    return (
      <View style={myPlanStyle.container}>
        <Text>作成したデートプランの数 {plans.total}</Text>
        <PlanCardList navigation={navigation} planList={plans.plan_list} />
      </View>
    );
  }
}
