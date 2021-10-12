import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  trHistory: [],
  currBal: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_WITHDARAW_MONEY_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isAdded: false,
        loading: true,
      };
    case actions.ADD_WITHDARAW_MONEY_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.ADD_WITHDARAW_MONEY_ERROR:
      return {
        ...state,
        error: true,
        isAdded: false,
        loading: false,
        message: action.error,
      };
    case actions.TARANSACTION_HISTORY_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.TARANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        trHistory: action.payload.data,
      };
    case actions.TARANSACTION_HISTORY_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_CURRENTBALENCE_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_CURRENTBALENCE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        currBal: action.payload.data,
      };
    case actions.GET_CURRENTBALENCE_ERROR:
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
