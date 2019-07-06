import * as React from "react";
import { Text, View, FlatList } from "react-native";
import axiosBase from "axios";

// from app
import { PlanList, Plan } from "app/src/constants/interfaces";
import { HomePlan } from "app/src/components/Plan";
import { homeStyle } from "app/src/styles/home-style";

interface State {
  // plans: PlanList;
  plans: any;
  errors: any;
}

// FIXME 設定ファイルに定義する
const plansApiBaseUrl = "http://localhost:3000/plans";
const axios = axiosBase.create({ baseURL: plansApiBaseUrl });

/**
 * ホーム画面トップ
 * @author kotatanaka
 */
export default class HomeScreen extends React.Component<State> {
  public state: State = {
    plans: { total: 0, plan_list: [] },
    errors: []
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
      .catch((error: any) => {
        this.setState({ errors: error });
      });
  }

  /** デートプランリストを描画する */
  renderPlanList = ({ item }: { item: Plan }) => HomePlan(item);

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
