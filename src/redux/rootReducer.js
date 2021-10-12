import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./app/reducer";
import login from "./login/reducer";
import partner from "./partner/reducer";
import product from "./product/reducer";
import subscribe from "./subscribe/reducer";
import wallet from "./wallet/reducer";
import user from "./user/reducer";
const rootReducer = (history) =>
  combineReducers({
    app,
    login,
    partner,
    user,
    product,
    subscribe,
    wallet,
    router: connectRouter(history),
  });
export default rootReducer;
