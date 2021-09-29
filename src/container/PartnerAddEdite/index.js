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
        <ContactDetails changeData={this.changeData} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log("ccch", this.state);
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
export default AdminPartner;
