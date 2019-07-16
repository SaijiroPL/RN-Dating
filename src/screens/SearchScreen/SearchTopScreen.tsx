import React from "react";
import { Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

// from app
import { searchStyle } from "app/src/styles/search-style";
import colors from "app/src/constants/colors";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  searchWord: string;
}

/**
 * 検索画面トップ
 * @author kotatanaka
 */
export default class SearchTopScreen extends React.Component<Props, State> {
  public state: State = {
    searchWord: ""
  };

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
    return (
      <View style={searchStyle.container}>
        {this.renderSearchBar()}
        <Text>検索画面</Text>
      </View>
    );
  }
}
