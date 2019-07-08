import React from "react";
import { Text, View, FlatList } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import axiosBase from "axios";

// from app
import { PlanList, Plan, Error } from "app/src/constants/interfaces";
import PlanCard from "app/src/components/PlanCard";
import { homeStyle } from "app/src/styles/home-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  plans: PlanList;
  errors: Error;
}

// FIXME 設定ファイルに定義する
const plansApiBaseUrl = "http://localhost:3000/plans";
const axios = axiosBase.create({ baseURL: plansApiBaseUrl });

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
  getPlanList() {
    axios
      .get("")
      .then((response: { data: PlanList }) => {
        this.setState({ plans: response.data });
      })
      .catch((error: Error) => {
        this.setState({ errors: error });
      });
  }

  /** デートプランリストを描画する */
  renderPlanList = ({ item }: { item: Plan }) => {
    const { navigation } = this.props;
    return <PlanCard navigation={navigation} plan={item} />;
  };

  render() {
    const { plans } = this.state;

    return (
      <View style={homeStyle.container}>
        <Text>デートプラン数 {plans.total}</Text>
        <FlatList
          data={plans.plan_list}
          renderItem={this.renderPlanList}
          keyExtractor={(item, index) => item.plan_id}
        />
      </View>
    );
  }
}
