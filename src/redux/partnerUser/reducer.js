import * as actions from "./constant";
const initialState = {
  error: false,
  isAuthenticated: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
        isAuthenticated: false,
      };
    case actions.LOGIN_PARTNER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAuthenticated: true,
      };
    case actions.LOGIN_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isAuthenticated: false,
        message: action.error,
      };
    case actions.FORGET_PASSWORD_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        isSend: false,
      };
    case actions.FORGET_PASSWORD_PARTNER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSend: true,
      };
    case actions.FORGET_PASSWORD_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSend: false,
      };
    case actions.SAVE_CONTACTUS_INITIATED:
      return {
        ...state,
        error: false,
        isAdded: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_CONTACTUS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_CONTACTUS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isAdded: false,
        message: action.error,
      };
    case actions.SAVE_SUPPORT_INITIATED:
      return {
        ...state,
        error: false,
        isAdded: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_SUPPORT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_SUPPORT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isAdded: false,
        message: action.error,
      };
    default:
      return state;
  }
};
