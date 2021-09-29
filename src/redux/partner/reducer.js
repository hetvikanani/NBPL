import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  partner: {},
  partners: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_PARTNER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_PARTNERS_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        partners: action.payload.data,
      };
    case actions.GET_PARTNERS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_PARTNER_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNER_BY_ID_SUCCESS:
      return {
        ...state,
        error: false,
        message: false,
        loading: false,
        partner: action.payload.data,
      };
    case actions.GET_PARTNER_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    default:
      return state;
  }
};
