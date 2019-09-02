interface LoginUser {
  id: string;
  name: string;
  imageUrl: string;
}

interface RegisterUser {
  mailAddress: string;
  password: string;
}

export interface State {
  // ログイン中のユーザー
  loginUser: LoginUser;
  // ユーザー登録に必要な情報
  registerUser: RegisterUser;
}

export enum ActionType {
  SET_LOGIN_USER = "SET_LOGIN_USER",
  SET_REGISTER_USER = "SET_REGISTER_USER"
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
    case ActionType.SET_REGISTER_USER:
      return {
        ...state,
        registerUser: payload
      };
  }
};

export default Reducer;
