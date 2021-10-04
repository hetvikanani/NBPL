import React, { Component } from "react";

import { PackageStyle } from "./style";
import { Button } from "components/Form";
import { ButtonConst } from "App/AppConstant";
class PackageCard extends Component {
  listUI = (list) => {
    try {
      return (
        <div className="list">
          <i className="fas fa-circle"></i>
          <span>{list}</span>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { data, period, checked } = this.props;
    return (
      <PackageStyle>
        <div className="cardDiv anime">
          <div className="headingDiv">
            <h2>{data.heading}</h2>
          </div>
          <div className="priceDiv">
            <i className="fas fa-rupee-sign"></i>
            <h1>
              {checked ? data.amount2 + "/" : data.amount + "/"}
              <sub className="month-txt">{period}</sub>
            </h1>
          </div>
          <div className="listDiv anime">
            {this.listUI(data.li_1)}
            {this.listUI(data.li_2)}
            {this.listUI(data.li_3)}
            {data.heading !== "Silver" && (
              <>
                {this.listUI(data.li_4)}
                {this.listUI(data.li_5)}
              </>
            )}
          </div>
          <div className="btnDiv">
            <Button>{ButtonConst.select}</Button>
          </div>
        </div>
      </PackageStyle>
    );
  }
}
export default PackageCard;
