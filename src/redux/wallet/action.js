import { WalletConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const addWithdarawMoney = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_WITHDARAW_MONEY_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.ADD_WITHDARAW_MONEY + payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.ADD_WITHDARAW_MONEY_SUCCESS,
        payload: response,
      });
      window.location.reload();
    } else
      dispatch({ type: actions.ADD_WITHDARAW_MONEY_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_WITHDARAW_MONEY_ERROR,
      error: "Network Error",
    });
  }
};

export const getTaransactionHistory = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.TARANSACTION_HISTORY_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.TARANSACTION_HISTORY,
      payload
    );
    if (response.responseStatus === "1") {
      // message.success(response.message);
      await dispatch({
        type: actions.TARANSACTION_HISTORY_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.TARANSACTION_HISTORY_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.TARANSACTION_HISTORY_ERROR,
      error: "Network Error",
    });
  }
};
export const getCurrentBalence = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_CURRENTBALENCE_INITIATED });
    let response = await axiosAuthGet(WalletConst.CURRENTBALENCE + payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_CURRENTBALENCE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_CURRENTBALENCE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_CURRENTBALENCE_ERROR,
      error: "Network Error",
    });
  }
};
