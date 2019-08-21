interface LoginUser {
  id: string;
  name: string;
  imageUrl: string;
}

export interface State {
  loginUser: LoginUser;
}

export interface Action {
  type: "SET_LOGIN_USER";
  payload: LoginUser;
}

/** Reducer */
const Reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOGIN_USER":
      return {
        ...state,
        loginUser: payload
      };
  }
};

export default Reducer;
