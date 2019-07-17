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
import { PlanList, Error } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import { myPlanStyle } from "app/src/styles/myplan-screen-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  plans: PlanList;
  errors: Error;
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
          // TODO ユーザーID繋ぎこみ
          user_id: "259fdf82-bb88-4e8a-be9d-4335592e8e41"
        }
      })
      .then((response: { data: PlanList }) => {
        this.setState({ plans: response.data });
      })
      .catch((error: Error) => {
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
