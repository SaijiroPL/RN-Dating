import * as React from "react";
import { Text, View, FlatList } from "react-native";
import axiosBase from "axios";

// from app
import styles from "./styles";

interface State {
  // plans: PlanList;
  plans: any;
  errors: any;
}

interface PlanList {
  total: number;
  plan_list: Array<Plan>;
}

interface Plan {
  plan_id: string;
  title: string;
  description: string;
  create_date: string;
  representative_spot: string;
  user_name: string;
  user_image_url: string;
  like_count: number;
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

  /** デートプランリストを描画する */
  renderPlanList = ({ item }: { item: Plan }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.create_date}</Text>
    </View>
  );

  componentDidMount() {
    // デートプラン一覧取得
    axios
      .get("")
      .then((response: { data: PlanList }) => {
        this.setState({ plans: response.data });
      })
      .catch((error: any) => {
        this.setState({ errors: error });
      });
  }

  render() {
    const { plans } = this.state;

    return (
      <View style={styles.container}>
        <Text>デートプランの数 {plans.total}</Text>
        <FlatList
          data={plans.plan_list}
          renderItem={this.renderPlanList}
          keyExtractor={(item, index) => item.plan_id}
        />
      </View>
    );
  }
}
