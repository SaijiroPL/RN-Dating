interface LoginUser {
  id: string;
  name: string;
  imageUrl: string;
}

export interface State {
  loginUser: LoginUser;
}

export enum ActionType {
  SET_LOGIN_USER = "SET_LOGIN_USER"
}

export interface Action {
  type: ActionType;
  payload: any;
}

/** Reducer */
const Reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_LOGIN_USER:
      return {
        ...state,
        loginUser: payload
      };
  }
};

export default Reducer;
