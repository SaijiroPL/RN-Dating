import AppNavigator from 'src/navigation/AppNavigator';

const initialState = null;

/**
 * state.navigationを扱うReducer
 * @author tanakakota
 */
export default (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
