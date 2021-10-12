import { push } from "connected-react-router";
import { message, notification } from "antd";

import { axiosGet } from "modules/Axios";
import { loader } from "redux/app/actions";
import { apiConstant, partnerUsersConst } from "modules/config";
import * as actions from "./constant";

export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_INITIATED });
    let url =
      payload.role === "admin"
        ? apiConstant.AUTH_LOGIN
        : apiConstant.PARTNER_LOGIN;
    let response = await axiosGet(
      url + payload.userName + "/" + payload.password
    );
    if (response.responseStatus === "1") {
      let data = {
        userName: payload.userName,
        userId: response.userid,
        token: response.token,
        role: payload.role,
        prj: "nblPartner",
        login: new Date(),
      };
      localStorage.setItem("auth", JSON.stringify(data));
      await dispatch({ type: actions.LOGIN_SUCCESS, payload: response });
      let msg = "Login as " + payload.role;
      if (window.innerWidth > 1000) {
        notification["success"]({
          message: "User Authorized",
          description: msg,
        });
      } else message.success(msg);
      dispatch(push("/"));
      window.location.reload();
    } else dispatch({ type: actions.LOGIN_ERROR, error: response.message });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.LOGIN_ERROR, error: "Network Error" });
  }
};
export const setAuth = (payload) => (dispatch) => {
  dispatch({ type: actions.SET_AUTH, payload });
};
export const setAuthUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_AUTH_INITIATED });
    let response = await axiosGet(payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.SET_AUTH_SUCCESS, payload: response });
    } else {
      dispatch({ type: actions.SET_AUTH_ERROR, error: response });
      dispatch(logout());
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SET_AUTH_ERROR, error: "Network Error" });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGOUT_INITIATED });
    dispatch(loader(true));
    localStorage.removeItem("auth");
    dispatch({ type: actions.LOGOUT });
    dispatch(loader(false));
    window.location.pathname !== "/login" && dispatch(push("/login"));
    window.location.reload();
  } catch (error) {
    dispatch(loader(false));
    console.log(error, "Logout Error");
  }
};
