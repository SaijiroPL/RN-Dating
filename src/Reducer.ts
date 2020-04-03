/** ログイン中のユーザー */
interface LoginUser {
  id: string;
  name: string;
  imageUrl: string;
}

/** ユーザー登録に必要な情報 */
interface RegisterUser {
  mailAddress: string;
  password: string;
}

/** プラン作成に必要な情報 */
interface CreatePlan {
  date: string;
  transportations: Array<string>;
}

/** Global State */
export interface State {
  loginUser: LoginUser;
  registerUser: RegisterUser;
  createPlan: CreatePlan;
}

export enum ActionType {
  SET_LOGIN_USER = 'SET_LOGIN_USER',
  SET_REGISTER_USER = 'SET_REGISTER_USER',
  SET_CREATE_PLAN = 'SET_CREATE_PLAN',
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
        loginUser: payload,
      };
    case ActionType.SET_REGISTER_USER:
      return {
        ...state,
        registerUser: payload,
      };
    case ActionType.SET_CREATE_PLAN:
      return {
        ...state,
        createPlan: payload,
      };
  }
};

export default Reducer;
