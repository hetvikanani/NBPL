import axios from "axios";
import store from "redux/store";
import { configVar } from "modules/config";
import { errorHandler, errorEmpty } from "redux/app/actions";

// const token = localStorage.auth ? JSON.parse(localStorage.auth).token : "";
// const config = { headers: { Authorization: `Bearer ${token}` } };

export const axiosGet = async (url) => {
  try {
    debugger;
    let { data: response } = await axios.get(configVar.BASE_URL + url);
    if (response.responseStatus!=="1")
      store.dispatch(errorHandler(response.message));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler());
    console.log(error);
  }
};
export const axiosPost = async (url, payload) => {
  try {
    let { data: response } = await axios.post(
      configVar.BASE_URL + url,
      payload
    );
    if (response.responseStatus!=="1")
      store.dispatch(errorHandler(response.message));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler());
    console.log(error);
  }
};
export const axiosAuthGet = async (url) => {
  try {
    url = url.replace(/[^\x00-\x7F]/g, "");
    let { data: response } = await axios.get(configVar.BASE_URL + url);
    if (response.responseStatus!=="1")
      store.dispatch(errorHandler(response.message));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const axiosAuthPost = async (url, payload) => {
  try {
    
    url = url.replace(/[^\x00-\x7F]/g, "");
    console.log(configVar.BASE_URL + url);
    let  { data: response }  = await axios.post(configVar.BASE_URL + url, payload);
    if (response.responseStatus!=="1") 
      store.dispatch(errorHandler( response.message));    
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    console.log(error);
  }
};

