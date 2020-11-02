import { LatLng } from 'react-native-maps';
import { IPlace } from './interfaces/app/Map';
import { IPlanFull } from './interfaces/api/Plan';

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

export interface IPlaceNode {
  place: IPlace;
  cost: number;
  check: boolean;
}

/** プラン作成に必要な情報 */
interface CreatePlan {
  dateFrom: string;
  dateTo: string;
  transportations: Array<string>;
  center: LatLng;
  radius: number;
  spots: IPlace[];
  candidatedSpots: IPlaceNode[];
  heartedSpots: IPlaceNode[];
  route: {
    spots: IPlaceNode[];
    cost: number;
  };
}
interface MyPlan {
  plan: object;
}

/** Global State */
export interface State {
  loginUser: LoginUser;
  registerUser: RegisterUser;
  createPlan: CreatePlan;
  myPlan: IPlanFull;
  myPlanArrival: number;
}

export enum ActionType {
  SET_LOGIN_USER = 'SET_LOGIN_USER',
  SET_REGISTER_USER = 'SET_REGISTER_USER',
  SET_CREATE_PLAN = 'SET_CREATE_PLAN',
  SET_MY_PLAN = 'SET_MY_PLAN',
  SET_MY_PLAN_ARRIVAL = 'SET_MY_PLAN_ARRIVAL',
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
    case ActionType.SET_MY_PLAN_ARRIVAL:
      return {
        ...state,
        myPlanArrival: payload,
      };
    default:
      break;
  }
};

export default Reducer;
