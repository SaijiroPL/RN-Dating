const initialState = null;

/**
 * state.screenを扱うReducer
 * 現在どのスクリーンを見ているかの情報を保持する
 * @author tanakakota
 */
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SCREEN_SET':
      return payload.current;
    default:
      return state;
  }
};
