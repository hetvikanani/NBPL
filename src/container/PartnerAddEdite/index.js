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
import { savePartner,getPartnerById  } from "redux/partner/action";
import { withRouter } from "react-router-dom";

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
    const { basicDetailsData, financialDetailsData } = this.state;
    let data = {
      partnerId: 0,
      companyName: basicDetailsData.companyName,
      emailId: basicDetailsData.email,
      mobile: basicDetailsData.mobile?.toString(),
      // gstType: basicDetailsData.gstType,
      gstType:basicDetailsData.gstType ? 1 : 0,
      gstNumber: basicDetailsData.gst,
      pan: basicDetailsData.pan,
      aadharNumber: basicDetailsData.aadhar?.toString(),
      companyLogo: basicDetailsData.img,
      bankName: financialDetailsData.bankName,
      branchName: financialDetailsData.branchName,
      accountNumber: financialDetailsData.accountNo?.toString(),
      ifsc: financialDetailsData.ifscCode,
      address: financialDetailsData.address,
      pincode: financialDetailsData.pincode?.toString(),
      city: financialDetailsData.city,
      state: financialDetailsData.state,
      ContactDetails: contacts,
     
    };
    this.props.savePartner(data);

  };
  pageUI = () => {
    try {
      const { count } = this.state;
      return count === 0 ? (
        <BasicDetails changeData={this.changeData} countInc={this.countInc} />
      ) : count === 1 ? (
        <FinancialDetails    changeData={this.changeData} countInc={this.countInc} previous={this.previous} />
      ) : count === 2 ? (
        <ContactDetails changeData={this.changeData} apiCall={this.apiCall} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount(){
   
    
    const id=this?.props?.match?.params?.id;
   
    if(id)
    this.props.getPartnerById(id)
  }
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
});
const mapDispatchToProps = (dispatch) => ({
  savePartner: (payload) => dispatch(savePartner(payload)),
  getPartnerById:(id)=>dispatch(getPartnerById(id)),

});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPartner)
);

