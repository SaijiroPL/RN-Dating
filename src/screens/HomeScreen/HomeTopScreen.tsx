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
import { PlanList, BadRequestError } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import CreatePlanFab from "app/src/components/CreatePlanFab";
import { homeStyle } from "app/src/styles/home-screen-style";

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
 * ホーム画面トップ
 * @author kotatanaka
 */
export default class HomeTopScreen extends React.Component<Props, State> {
  public state: State = {
    plans: { total: 0, plan_list: [] },
    errors: { code: 0, message: "", detail_massage: [] }
  };

  componentDidMount() {
    this.getPlanList();
  }

  /** デートプラン一覧取得 */
  // TODO 自分のエリアで人気のデートプランを取得する
  getPlanList() {
    axios
      .get("")
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
      <View style={homeStyle.container}>
        <Text>デートプラン数 {plans.total}</Text>
        <PlanCardList navigation={navigation} planList={plans.plan_list} />
        <CreatePlanFab navigation={navigation} />
      </View>
    );
  }
}
