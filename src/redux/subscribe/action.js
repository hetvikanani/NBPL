import { message } from "antd";

import { subscribeConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const getSubscribePackage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PACKAGE_INITIATED });
    let response = await axiosAuthGet(subscribeConst.PACKAGE, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({ type: actions.GET_PACKAGE_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_PACKAGE_ERROR, error: "Network Error" });
  }
};
export const saveProductPackage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthPost(
      subscribeConst.SAVE_PRODUCT_PACKAGE,
      payload
    );
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.SAVE_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SAVE_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getProductPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthPost(subscribeConst.GET_PRODUCT_PACKAGE + id);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteProductPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthGet(
      subscribeConst.DELETE_PRODUCT_PACKAGE + id
    );
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.DELETE_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
