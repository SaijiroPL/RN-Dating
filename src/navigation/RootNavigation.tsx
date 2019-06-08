import * as React from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { createReduxContainer } from "react-navigation-redux-helpers";

// from app
import AppNavigator from "app/src/navigation/AppNavigator";

const App = createReduxContainer(AppNavigator, "root");

interface Props {
  navigation?: any;
  dispatch?: any;
}

interface State {
  loading: boolean;
}

/**
 * ルーティングの大元となるクラス
 * @author tanakakota
 */
@connect((state: any) => ({ navigation: state.navigation }))
class AppWithNavigationState extends React.Component<Props, State> {
  public state: State = {
    loading: false
  };

  // マウントされた時に1度だけ呼ばれる
  async componentDidMount() {
    // this.onBackPressがAndroidのバックボタンで呼び出されるようにする
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  // ComponentたDOMから削除される時に呼ばれる
  componentWillUnmount() {
    // this.onBackPressがAndroidのバックボタンで呼び出されないようにする
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { navigation, dispatch } = this.props;

    if (navigation.routes[navigation.index].index === 0) return false;

    // 前のスクリーンに戻る
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { loading } = this.state;
    const { navigation, dispatch } = this.props;

    if (loading) return null;

    return <App dispatch={dispatch} state={navigation} />;
  }
}

export default AppWithNavigationState;
