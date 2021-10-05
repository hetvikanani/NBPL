import * as actions from "./constant";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  partner: {
    contactDetails: [
      {
        key: uuidv4(),
        contactName: "",
        mobile: "",
        email: "",
        designation: "",
        check: false,
        save: false,
      },
    ],
  },
  partners: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_PARTNER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_PARTNERS_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        partners: action.payload.data,
      };
    case actions.GET_PARTNERS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_PARTNER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_PARTNER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_PARTNER_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNER_BY_ID_SUCCESS: {
      const data = action.payload.data;
      let newData = {
        pan: data.pan,
        email: data.emailId,
        mobile: data.mobile,
        aadhar: data.aadharNumber,
        gst: data.gstNumber,
        // gstType:data.gstType,
        companyName: data.companyName,
        img: data.companyLogo,
        bankName: data.bankName,
        branchName: data.branchName,
        address: data.address,
        accountNumber: data.accountNumber,
        ifscCode: data.ifsc,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
      };
      let contactDetails = [];
      data?.contactDetails.forEach((a, i) => {
        let detail = {
          key: a.contactId,
          contactName: a.contactName,
          mobile: a.mobile,
          emailId: a.emailId,
          designation: a.designation,
          save: data.contactDetails.length - 2 === i,
        };
        contactDetails.push(detail);
      });
      newData.contactDetails = contactDetails;
      // contactName: partner.contactName,
      //         mobile: partner.mobile,
      //         email: partner.emailId,
      //         designation: partner.designation,
      return {
        ...state,
        error: false,
        message: false,
        loading: false,
        partner: { ...action.payload.data, ...newData },
      };
    }
    case actions.GET_PARTNER_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.CHANGE_PARTNER_DATA: {
      if (action.payload.reset)
        return {
          ...state,
          partner: {
            contactDetails: [
              {
                key: uuidv4(),
                contactName: "",
                mobile: "",
                email: "",
                designation: "",
                check: false,
                save: false,
              },
            ],
          },
        };
      return {
        ...state,
        partner: {
          ...state.partner,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    default:
      return state;
  }
};
