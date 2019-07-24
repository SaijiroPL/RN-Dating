import React from "react";
import { View } from "react-native";
import { Constants } from "expo";
import { SearchBar } from "react-native-elements";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import axiosBase from "axios";
import { Ionicons } from "@expo/vector-icons";

// from app
import { PlanList, BadRequestError } from "app/src/constants/interfaces";
import PlanCardList from "app/src/components/PlanCardList";
import { searchStyle } from "app/src/styles/search-screen-style";
import colors from "app/src/constants/colors";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  searchWord: string;
  plans: PlanList;
  errors: BadRequestError;
}

const axios = axiosBase.create({
  baseURL: Constants.manifest.extra.apiEndpoint + "/plans"
});

/**
 * 検索画面トップ
 * @author kotatanaka
 */
export default class SearchTopScreen extends React.Component<Props, State> {
  public state: State = {
    searchWord: "",
    plans: { total: 0, plan_list: [] },
    errors: { code: 0, message: "", detail_massage: [] }
  };

  componentDidMount() {
    this.getPlanList();
  }

  /** デートプラン一覧取得 */
  // TODO デートプラン検索APIに置き換える
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

  updateSearchWord = (searchWord: string) => {
    this.setState({ searchWord });
  };

  /** 検索バーを描画する */
  renderSearchBar() {
    const { searchWord } = this.state;
    return (
      <SearchBar
        placeholder="検索"
        round={true}
        lightTheme={true}
        searchIcon={
          <Ionicons name="ios-search" size={26} color={colors.textTintColor} />
        }
        // TODO キャンセルボタンのカスタマイズ
        onChangeText={this.updateSearchWord}
        value={searchWord}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { plans } = this.state;

    return (
      <View style={searchStyle.container}>
        {this.renderSearchBar()}
        <PlanCardList navigation={navigation} planList={plans.plan_list} />
      </View>
    );
  }
}
