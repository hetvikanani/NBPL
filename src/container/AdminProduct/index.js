import React, { Component } from "react";

import { AdminProStyle } from "./style";
import { Menu, Header,ProAddEditDetail,ProductDocument  } from "components/Form";
import {adminProConst} from "./constant";
class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  countInc = () => {
    try {
      const { count } = this.state;
      this.setState({count:count+1})

    } catch (error) {
      console.log(error);
    }
  };
  pageUI = () => {
    try {
      const { count } = this.state;
      return count === 0 ? <ProAddEditDetail countInc={this.countInc} /> : count ===1?<ProductDocument countInc={this.countInc}/>:"";
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {count}=this.state;

    return (
      <AdminProStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <h2>{adminProConst.products}</h2>
            <div className="formDiv">
            <h2>{adminProConst.addNewPro + adminProConst.colon}</h2> 
            {this.pageUI()}
            </div>         
          </div>
        </div>
      </AdminProStyle>
    );
  }
}
export default AdminProduct;
