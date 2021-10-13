import { message } from "antd";
import { push } from "connected-react-router";

import * as actions from "./constant";
import { partnerConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";

export const savePartner = (payload) => async (dispatch) => {
  try {
    console.log("xxx", payload);
    dispatch({ type: actions.SAVE_PARTNER_INITIATED });
    let response = await axiosAuthPost(partnerConst.SAVE_PARTNER, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_PARTNER_SUCCESS, payload: response });
      if (payload.isRedirectNeeded) dispatch(push("/partners"));
    } else dispatch({ type: actions.SAVE_PARTNER_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_PARTNER_ERROR, error: "Network Error" });
  }
};
export const getPartners = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PARTNERS_INITIATED });
    let response = await axiosAuthPost(partnerConst.GET_PARTNERS, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_PARTNERS_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PARTNERS_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_PARTNERS_ERROR, error: "Network Error" });
  }
};
export const deletePartner = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PARTNER_INITIATED });
    let response = await axiosAuthGet(partnerConst.DELETE_PARTNER + id);
    if (response.responseCodes === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PARTNER_SUCCESS,
        payload: response,
      });
      var s = {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "partnerid desc",
      };
      try {
        dispatch({ type: actions.GET_PARTNERS_INITIATED });
        let response = await axiosAuthPost(partnerConst.GET_PARTNERS, s);
        if (response.responseStatus === "1") {
          await dispatch({
            type: actions.GET_PARTNERS_SUCCESS,
            payload: response,
          });
        } else dispatch({ type: actions.GET_PARTNERS_ERROR, error: response });
      } catch (error) {
        console.log(error, "action catch");
        dispatch({ type: actions.GET_PARTNERS_ERROR, error: "Network Error" });
      }
    } else dispatch({ type: actions.DELETE_PARTNER_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.DELETE_PARTNER_ERROR, error: "Network Error" });
  }
};
export const getPartnerById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PARTNER_BY_ID_INITIATED });
    let response = await axiosAuthGet(partnerConst.GET_PARTNER_BY_ID + id);

    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PARTNER_BY_ID_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_PARTNER_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_PARTNER_BY_ID_ERROR, error: "Network Error" });
  }
};

export const changePartnerData = (key, value, reset) => async (dispatch) => {
  dispatch({
    type: actions.CHANGE_PARTNER_DATA,
    payload: { key, value, reset },
  });
};
