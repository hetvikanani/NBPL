import { message } from "antd";
import { push } from "connected-react-router";
import { crmConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const saveProspect = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_PROSPECT, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_PROSPECT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_PROSPECT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_PROSPECT_ERROR,
      error: "Network Error",
    });
  }
};
export const getProspect = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_PROSPECT, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PROSPECT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PROSPECT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PROSPECT_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteProspect = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PROSPECT_INITIATED });
    let response = await axiosAuthGet(crmConst.DELETE_PROSPECT + id);
    if (response.code === "200") {
      await dispatch({
        type: actions.DELETE_PROSPECT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_PROSPECT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_PROSPECT_ERROR,
      error: "Network Error",
    });
  }
};
export const getCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_CUSTOMER, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_CUSTOMER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_CUSTOMER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_CUSTOMER_ERROR,
      error: "Network Error",
    });
  }
};
export const getleadType = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEAD_TYPE_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEAD_TYPE, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_LEAD_TYPE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LEAD_TYPE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_LEAD_TYPE_ERROR,
      error: "Network Error",
    });
  }
};
export const getProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_PRODUCT, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PRODUCT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PRODUCT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PRODUCT_ERROR,
      error: "Network Error",
    });
  }
};
export const saveLeads = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_LEADS_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_LEADS, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_LEADS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_LEADS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_LEADS_ERROR,
      error: "Network Error",
    });
  }
};
export const getLeads = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEADS_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEADS, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_LEADS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LEADS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_LEADS_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteLead = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_LEAD_INITIATED });
    let response = await axiosAuthGet(crmConst.DELETE_LEAD + id);
    if (response.code === "200") {
      await dispatch({
        type: actions.DELETE_LEAD_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_LEAD_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_LEAD_ERROR,
      error: "Network Error",
    });
  }
};
export const getProductByCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_BY_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(
      crmConst.GET_PRODUCT_BY_CUSTOMER,
      payload
    );
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PRODUCT_BY_CUSTOMER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PRODUCT_BY_CUSTOMER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PRODUCT_BY_CUSTOMER_ERROR,
      error: "Network Error",
    });
  }
};
export const saveDemo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_DEMO, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_DEMO_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_DEMO_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_DEMO_ERROR,
      error: "Network Error",
    });
  }
};
export const getDemo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_DEMO, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_DEMO_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_DEMO_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_DEMO_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteDemo = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_DEMO_INITIATED });
    let response = await axiosAuthGet(crmConst.DELETE_DEMO + id);
    if (response.code === "200") {
      await dispatch({
        type: actions.DELETE_DEMO_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_DEMO_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_DEMO_ERROR,
      error: "Network Error",
    });
  }
};
export const getPartnerProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PARTNER_PRODUCT_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_PARTNER_PRODUCT, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PARTNER_PRODUCT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PARTNER_PRODUCT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PARTNER_PRODUCT_ERROR,
      error: "Network Error",
    });
  }
};
export const getProductSubscription = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_SUBSCRIPTION_INITIATED });
    let response = await axiosAuthPost(
      crmConst.GET_PRODUCT_SUBSCRIPTION,
      payload
    );
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PRODUCT_SUBSCRIPTION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PRODUCT_SUBSCRIPTION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PRODUCT_SUBSCRIPTION_ERROR,
      error: "Network Error",
    });
  }
};
export const getLeadCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEAD_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEAD_CUSTOMER, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_LEAD_CUSTOMER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LEAD_CUSTOMER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_LEAD_CUSTOMER_ERROR,
      error: "Network Error",
    });
  }
};
export const saveSales = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_SALES_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_SALES, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_SALES_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_SALES_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_SALES_ERROR,
      error: "Network Error",
    });
  }
};
export const getSales = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_SALES_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_SALES, payload);
    if (response.code === "200") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_SALES_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_SALES_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_SALES_ERROR,
      error: "Network Error",
    });
  }
};
