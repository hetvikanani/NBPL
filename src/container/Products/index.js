import React, { Component } from "react";
import { Row, Col, Card, Image } from "antd";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { ProductStyle } from "./style";
import { Menu, Header } from "components/Form";
import { CRdata } from "./constant";
import {
  view,
  edit,
  packag,
  deleteSvg,
} from "components/Images";
class products extends Component {
   
  CardUI = () => {
    try {
       let pathname = window.location.pathname;
      return CRdata.map((a, i) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} key={i}>
          <Card className="main-card-div">
            <div className={"head-box " + a.class} onClick={() => this.props.history.push("/productDetail/" + a.heading.split(" ")[0])}>
              <Image src={a.img} preview={false} className="img-div" />
            </div>
            <div className="contant_div">
              <div className="heding_div">
                <h3>{a.heading}</h3>
                <h3>{a.heading2}</h3>
              </div>
            </div>
            <p className="pere_con_div">{a.content}</p>
            {pathname !== "/admin-product"&& <NavLink to={"/productDetail/" + a.heading.split(" ")[0]}>
              View More
            </NavLink>}
            {pathname === "/admin-product"&&(
            <div className ="actionDiv">
              <div className = "acLogDiv pointer">
               <Image src={view} preview={false}  width={15}/>
              </div>
              <div className = "acLogDiv pointer">
               <Image src={edit} preview={false}  width={15}/>
              </div>
              <div className = "acLogDiv pointer" onClick={() => this.props.history.push("/package-list/" + a.heading.split(" ")[0])}>
               <Image src={packag} preview={false}  width={20}/>
              </div>
              <div className = "acLogDiv pointer">
               <Image src={deleteSvg} preview={false}  width={15}/>
              </div>

            </div>
            )}

          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let pathname = window.location.pathname;
    return (
      <ProductStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
          <div className="headDiv">
            <h2>NBL Products</h2>
            {pathname === "/admin-product"&&<div
                className="addButton pointer"
                onClick={() => this.props.history.push("/add-new-product")}
              >
                <PlusOutlined />
              </div>}
          </div>
            <div className="products_div">
              <Row gutter={25}>{this.CardUI()}</Row>
            </div>
          </div>
        </div>
      </ProductStyle>
    );
  }
}
export default  withRouter(products);
