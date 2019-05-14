import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';

// from app
import AppNavigator from 'app/src/navigation/AppNavigator';

const App = reduxifyNavigator(AppNavigator, 'root');

@connect(state => ({ navigation: state.navigation }))
export default class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  // マウントされた時に1度だけ呼ばれる
  async componentDidMount() {
    // this.onBackPressがAndroidのバックボタンで呼び出されるようにする
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  // ComponentたDOMから削除される時に呼ばれる
  componentWillUnmount() {
    // this.onBackPressがAndroidのバックボタンで呼び出されないようにする
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
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