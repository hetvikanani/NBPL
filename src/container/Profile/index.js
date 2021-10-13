import React, { Component } from "react";
import { Collapse, Menu, Header } from "components/Form";
import BasicDetails from "./Constant/BasicDetails";
import FinanicialDetails from "./Constant/FinancialDetails";
import ContactDetails from "./Constant/ContactDetails";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  savePartner,
  getPartners,
  getPartnerById,
  changePartnerData,
} from "redux/partner/action";
import { ProfileStyle } from "./style";

import { getAuthUserID } from "modules/helper";
var userId = getAuthUserID();

class Profile extends Component {
  componentDidMount() {
    userId = userId ? userId : getAuthUserID();
    this.props.getPartnerById();
  }
  changeData = (key, data) => {
    this.setState({ [key]: data });
  };

  apiCall = (isRedirectNeeded) => {
    const { partner } = this.props;

    let data = {
      partnerId: partner?.partnerId,
      companyName: partner.companyName,
      emailId: partner.email,
      mobile: partner.mobile?.toString(),
      gstType: partner.gstType ? 1 : 0,
      gstNumber: partner.gst,
      pan: partner.pan,
      aadharNumber: partner.aadhar?.toString(),
      companyLogo: partner.companyLogo,
      bankName: partner.bankName,
      branchName: partner.branchName,
      accountNumber: partner.accountNumber?.toString(),
      ifsc: partner.ifscCode,
      address: partner.address?.toString(),
      pincode: partner.pincode?.toString(),
      city: partner.city,
      state: partner.state,
      contactDetails: partner?.contactDetails,
      isRedirectNeeded,
      userId: userId,
    };
    this.props.savePartner(data);
  };
  panelUI = () => {
    try {
      let array = ["Basic Details", "Financial Details", "Contact Details"];
      let colArray = [];
      array.forEach((a) => {
        colArray.push({
          header: a,
          body:
            a === "Basic Details" ? (
              <BasicDetails
                changeData={this.changeData}
                apiCall={this.apiCall}
              />
            ) : a === "Financial Details" ? (
              <FinanicialDetails
                changeData={this.changeData}
                apiCall={this.apiCall}
              />
            ) : (
              <ContactDetails
                changeData={this.changeData}
                apiCall={this.apiCall}
              />
            ),
        });
      });
      return colArray;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    // let x = JSON.parse(localStorage.getItem("auth"));
    return (
      <ProfileStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <Collapse panelData={this.panelUI()}></Collapse>
          </div>
        </div>
      </ProfileStyle>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("aakhu state", state);
  return {
    loading: state.partner.loading,
    error: state.partner.error,
    message: state.partner.message,
    partners: state.partner.partners,
    partner: state.partner.partner,
  };
};
const mapDispatchToProps = (dispatch) => ({
  savePartner: (payload) => dispatch(savePartner(payload)),
  getPartners: (payload) => dispatch(getPartners(payload)),
  getPartnerById: (id) => dispatch(getPartnerById(userId)),
  changePartnerData: (key, value) =>
    dispatch(changePartnerData(key, value, true)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);

// JSON.parse(localStorage.getItem("auth")).userId)
