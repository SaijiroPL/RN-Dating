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
interface MyPlan {
  plan: object;
}
interface CreateTempSpots {
  spots: object;
}
interface CreateRealSpots {
  spots: Array<object>;
}

/** Global State */
export interface State {
  loginUser: LoginUser;
  registerUser: RegisterUser;
  createPlan: CreatePlan;
  myPlan: MyPlan;
  createTempSpots: CreateTempSpots;
  createRealSpots: CreateRealSpots;
}

export enum ActionType {
  SET_LOGIN_USER = 'SET_LOGIN_USER',
  SET_REGISTER_USER = 'SET_REGISTER_USER',
  SET_CREATE_PLAN = 'SET_CREATE_PLAN',
  SET_MY_PLAN = 'SET_MY_PLAN',
  SET_CREATE_TEMP_SPOTS = 'SET_CREATE_TEMP_SPOTS',
  SET_CREATE_REAL_SPOTS = 'SET_CREATE_REAL_SPOTS',
}

export interface Action {
  type: ActionType;
  payload: any;
}

/** Reducer */
const Reducer = (state: State, action: Action): any => {
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
    case ActionType.SET_MY_PLAN:
      return {
        ...state,
        myPlan: payload,
      };
    case ActionType.SET_CREATE_TEMP_SPOTS:
      return {
        ...state,
        createTempSpots: payload,
      };
    case ActionType.SET_CREATE_REAL_SPOTS:
      return {
        ...state,
        createRealSpots: payload,
      };
    default:
      break;
  }
};

export default Reducer;
