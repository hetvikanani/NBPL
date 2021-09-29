import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app/reducer";
import login from "./login/reducer";
import partner from "./partner/reducer";
const rootReducer = (history) =>
  combineReducers({
    app,
    login,
    partner,
    router: connectRouter(history),
  });
export default rootReducer;
