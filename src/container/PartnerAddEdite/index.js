import React, { Component } from "react";

import { AdmProductStyle } from "./style";
import {
  Menu,
  Header,
  ContactDetails,
  BasicDetails,
  FinancialDetails,
} from "components/Form";
import { PartnerAddEditConst } from "./constant";
import { connect } from "react-redux";
import { savePartner } from "redux/partner/action";
import { withRouter } from "react-router-dom";
import { contactDetailConst } from "components/ContactDetails/constant";

class AdminPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      basicDetailsData: {},
      financialDetailsData: {},
      contractDetailsData: {},
    };
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
    const { basicDetailsData, contractDetailsData, financialDetailsData } =
      this.state;
    let data = {
      // partnerId: 0,
      partnerId: 1111114,
      companyName: basicDetailsData.companyName,
      emailId: basicDetailsData.email,
      mobile: basicDetailsData.mobile?.toString(),
      gstType: 0,
      gstNumber: basicDetailsData.gst,
      pan: basicDetailsData.pan,
      aadharNumber: basicDetailsData.aadhar?.toString(),
      companyLogo: "abc",
      bankName: financialDetailsData.bankName,
      branchName: financialDetailsData.branchName,
      accountNumber: financialDetailsData.accountNo?.toString(),
      ifsc: financialDetailsData.ifscCode,
      address: financialDetailsData.address,
      pincode: financialDetailsData.pincode?.toString(),
      city: financialDetailsData.city,
      state: financialDetailsData.state,
      contactDetails: [
        {
          ...contacts,
          contactId: 34,
          partnerId: 1111113,
          contactName: contractDetailsData.contactName,
          emailId: contractDetailsData.email,
          mobile: contractDetailsData.mobile?.toString(),
          designation: contractDetailsData.designation,
        },
      ],
    };
    // this.props.savePartner(data);
    console.log("datass",data);
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
        <ContactDetails changeData={this.changeData} apiCall={this.apiCall} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log("dataaaa", this.state);
    return (
      <AdmProductStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <h2>{PartnerAddEditConst.addNewPart}</h2>
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
});
const mapDispatchToProps = (dispatch) => ({
  savePartner: (payload) => dispatch(savePartner(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPartner)
);

// {
//   "partnerId":0,
// "aadharNumber": "1212121212",
// "accountNumber": "121212121212",
// "address": "Near Sasuji Dining Hall, C G Road",
// "bankName": "dsdsd",
// "branchName": "sdsddddsd",
// "city": "ahmedabad",
// "companyLogo": "a",
// "companyName": "cdsdcd",
// "emailId": "hetvipatel321010@gmail.com",
// "gstNumber": "DSDSDSDs",
// "gstType": 0,
// "ifsc": "121212121212",
// "mobile": "8511829060",
// "pan": "ABCDA1234A",
// "pincode": "360005",
// "state": "Gujarat",

// "contactDetails": [
//   {
//     "contactId": 3,
//     "partnerId": 1111112,
//     "contactName": "hetvi@napbooks.com",
//     "emailId": "hetvi@napbooks.com",
//     "mobile": "123456789",
//     "designation": "string"
//   }
// ]
// }
