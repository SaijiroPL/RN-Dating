import { createStore, combineReducers, applyMiddleware } from "redux";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

/* from app */
import { getActiveRouteName } from "app/src/navigation/AppNavigator";
import reducers from "app/src/redux/reducers";

interface Action {
  type: { indexOf: (arg0: string) => number };
}

interface Dispatch {
  type: string;
  payload: { current: any; next: any };
}

interface Nav {
  navigation: any;
}

/** Stateのデバッグ用のMiddleware */
const logger = () => (next: (arg0: any) => void) => (action: Action) => {
  if (__DEV__) {
    // 'Navigation'が含まれていなければログ出力(開発環境のみ)
    if (action.type.indexOf("Navigation") === -1) console.log(action);
  }
  next(action);
};

/** 画面遷移を追跡するMiddleware */
const screenTracking = (store: {
  getState: { (): Nav; (): Nav };
  dispatch: (arg0: Dispatch) => void;
}) => (next: { (arg0: any): void; (arg0: any): void }) => (action: {
  type: { indexOf: (arg0: string) => number };
}) => {
  // 'Navigation'が含まれていない場合は無視する
  if (action.type.indexOf("Navigation") === -1) return next(action);

  // 遷移前の routeName を取得する
  const currentScreen = getActiveRouteName(store.getState().navigation);
  const result = next(action);

  // 遷移後の routeName を取得する
  const nextScreen = getActiveRouteName(store.getState().navigation);

  // 現在のスクリーン名と次のスクリーン名をStoreに保存する
  store.dispatch({
    type: "SCREEN_SET",
    payload: {
      current: currentScreen,
      next: nextScreen
    }
  });

  return result;
};

/**
 * Storeの作成
 * @author tanakakota
 */
const store = createStore(
  // 1つのReducerにまとめる
  combineReducers({ ...reducers }),

  // ActionがReducerに到達する前にMiddlewareがキャッチできるようにする関数
  applyMiddleware(
    // react-navigationにおいてreduxのMiddlewareを作るために必要な関数
    // 第一パラメータはオプショナルなので抜く
    createReactNavigationReduxMiddleware(
      // 'root',
      (state: any) => state.navigation
    ),
    logger,
    screenTracking
  )
);

export default store;
