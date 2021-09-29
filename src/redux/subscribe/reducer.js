import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  package:{},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.PACKAGE_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case actions.PACKAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.SAVE_PRODUCT_PACKAGE_INITIATED:
      return {
        ...state,
        isAdded: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_PRODUCT_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAdded: true,
      };
    case actions.SAVE_PRODUCT_PACKAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAdded: false,
        message: action.error,
      };
      case actions.GET_PRODUCT_PACKAGE_INITIATED:
        return {
          ...state,
          message: false,
          error: false,
          loading: true,
        };
      case actions.GET_PRODUCT_PACKAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          package: action.payload.data,
        
        };
      case actions.GET_PRODUCT_PACKAGE_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
          message: action.error,
        };
        case actions.DELETE_PRODUCT_PACKAGE_INITIATED:
          return {
            ...state,
            isDeleted: false,
            message: false,
            error: false,
            loading: true,
          };
        case actions.DELETE_PRODUCT_PACKAGE_SUCCESS:
          return {
            ...state,
            loading: false,
            error: false,
            isDeleted: true,
          };
        case actions.DELETE_PRODUCT_PACKAGE_ERROR:
          return {
            ...state,
            loading: false,
            error: true,
            isDeleted: false,
            message: action.error,
          };
    default:
      return state;
  }
};
