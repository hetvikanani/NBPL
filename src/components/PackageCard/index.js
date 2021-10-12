import React, { Component } from "react";

import { PackageStyle } from "./style";
import { Button } from "components/Form";
import { ButtonConst } from "App/AppConstant";
class PackageCard extends Component {
 
  render() {
    const { data} = this.props;
    return (
      <PackageStyle>
        <div className="cardDiv anime">
          <div className="headingDiv">
            <h2>{data.package}</h2>
          </div>
          <div className="priceDiv">
            <i className="fas fa-rupee-sign"></i>
            <h1>
              { data.price + "/"}
              <sub className="month-txt">{data.subscription}</sub>
            </h1>
          </div>
          <div className="listDiv anime">
          <div className="list" dangerouslySetInnerHTML={{ __html: data.packageDescription }}/>
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
