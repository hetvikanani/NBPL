import React, { Component } from "react";

import { AdmProductStyle } from "./style";
import {
  Menu,
  Header,
  ContactDetails,
  BasicDetails,
  FinancialDetails,
} from "components/Form";
import {PartnerAddEditConst} from "./constant"
class AdminPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
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
  previous =()=>{
    const { count } = this.state;
    this.setState({ count: count - 1 });
  }
  pageUI = () => {
    try {
      const { count } = this.state;
      return count === 0 ? (
        <BasicDetails countInc={this.countInc} />
      ) : count === 1 ? (
        <FinancialDetails  countInc={this.countInc}  previous={this.previous}/>
      ) : count === 2 ? (
        <ContactDetails />
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
