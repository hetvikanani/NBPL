import React, { Component } from "react";

import { AdmProductStyle } from "./style";
import { PartnerAddEditConst } from "./constant";
import {
  Menu,
  Header,
  ContactDetails,
  BasicDetails,
  FinancialDetails,
} from "components/Form";
import { connect } from "react-redux";
import { savePartner, getPartnerById } from "redux/partner/action";
import { withRouter } from "react-router-dom";
import { changePartnerData } from "redux/partner/action";

class AdminPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      partnerData: [],
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match !== "/partner/new") {
        if (match?.params?.id) await this.props.getPartnerById(match.params.id);
        else this.props.changePartnerData(null, null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  countInc = () => {
    try {
      const { count } = this.state;
      this.setState({ count: count + 1 });
    } catch (error) {
      console.log(error);
    }
  };
  changeData = (key, data) => {
    this.setState({ [key]: data });
  };
  previous = () => {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  };

  apiCall = (contacts) => {
    // debugger;
    const { partner } = this.props;
    let id = 0;
    if (this?.props?.match?.params?.id)
      id = parseInt(this?.props?.match?.params?.id);
    let data = {
      partnerId: id,
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
    };
    this.props.savePartner(data);
  };
  pageUI = () => {
    try {
      const { count } = this.state;
      return count === 0 ? (
        <BasicDetails changeData={this.changeData} countInc={this.countInc} />
      ) : count === 1 ? (
        <FinancialDetails
          changeData={this.changeData}
          countInc={this.countInc}
          previous={this.previous}
        />
      ) : count === 2 ? (
        <ContactDetails
          changeData={this.changeData}
          apiCall={this.apiCall}
          previous={this.previous}
        />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <AdmProductStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <h2>{PartnerAddEditConst.addPart}</h2>
            {this.pageUI()}
          </div>
        </div>
      </AdmProductStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  error: state.partner.error,
  message: state.partner.message,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  savePartner: (payload) => dispatch(savePartner(payload)),
  getPartnerById: (id) => dispatch(getPartnerById(id)),
  changePartnerData: (key, value) =>
    dispatch(changePartnerData(key, value, true)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPartner)
);
