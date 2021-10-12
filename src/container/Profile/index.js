import React, { Component } from "react";

import { Collapse, Menu, Header } from "components/Form";
import BasicDetails from "./Constant/BasicDetails";
import FinanicialDetails from "./Constant/FinancialDetails";
import ContactDetails from "./Constant/ContactDetails";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getPartners, getPartnerById } from "redux/partner/action";

import { ProfileStyle } from "./style";

class Profile extends Component {
  componentDidMount() {
    this.props.getPartnerById();
  }
  panelUI = () => {
    try {
      let array = ["Basic Details", "Finanicial Details", "Contact Details"];
      let colArray = [];
      array.forEach((a) => {
        colArray.push({
          header: a,
          body:
            a === "Basic Details" ? (
              <BasicDetails />
            ) : a === "Finanicial Details" ? (
              <FinanicialDetails />
            ) : (
              <ContactDetails />
            ),
        });
      });
      return colArray;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
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
  console.log("state", "sta", state);
  return {
    loading: state.partner.loading,
    error: state.partner.error,
    message: state.partner.message,
    partners: state.partner.partners,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getPartners: (payload) => dispatch(getPartners(payload)),
  getPartnerById: (id) => dispatch(getPartnerById(20)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
