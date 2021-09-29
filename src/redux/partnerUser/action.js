import { message } from "antd";

import { partnerUsersConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const partnerLogin = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_PARTNER_INITIATED });
    let response = await axiosAuthGet(partnerUsersConst.LOGIN, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.LOGIN_PARTNER_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.LOGIN_PARTNER_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.LOGIN_PARTNER_ERROR, error: "Network Error" });
  }
};
export const forgotPwdPartner = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.FORGET_PASSWORD_PARTNER_INITIATED });
    let response = await axiosAuthGet(
      partnerUsersConst.FORGET_PASSWORD + payload
    );
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.FORGET_PASSWORD_PARTNER_SUCCESS,
        payload: response,
      });
    } else
      dispatch({
        type: actions.FORGET_PASSWORD_PARTNER_ERROR,
        error: response,
      });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.FORGET_PASSWORD_PARTNER_ERROR,
      error: "Network Error",
    });
  }
};
export const saveContactus = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_CONTACTUS_INITIATED });
    let response = await axiosAuthPost(partnerUsersConst.SAVE_CONTACTUS + id);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_CONTACTUS_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SAVE_CONTACTUS_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_CONTACTUS_ERROR, error: "Network Error" });
  }
};
export const saveSupport = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_SUPPORT_INITIATED });
    let response = await axiosAuthPost(partnerUsersConst.SAVE_SUPPORT + id);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_SUPPORT_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_SUPPORT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_SUPPORT_ERROR, error: "Network Error" });
  }
};
