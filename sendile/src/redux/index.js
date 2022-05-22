import { createStore } from "redux";

const obj = {
  jwtToken: "",
  haveToken: false,
  haveEmail: false,
  isLoading: false,
  email: "",
};
const reducerfn = (state = obj, action) => {
  if (action.type === "UPDATE_TOKEN") {
    return {
      ...state,
      haveToken: !state.haveToken,
      jwtToken: action.jwtToken,
    };
  }
  if (action.type === "FORGET_TOKEN") {
    return {
      ...state,
      haveToken: !state.haveToken,
      jwtToken: "",
    };
  }
  if (action.type === "UPDATE_EMAIL") {
    return {
      ...state,
      haveEmail: true,
      email: action.email,
    };
  }
  if (action.type === "SWITCH_LOADING") {
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  }
  return state;
};
const store = createStore(reducerfn);

export default store;
