import React, { Component } from "react";
import { Row, Col, Card, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { SelesStyle } from "./style";
import { Menu, Header, Table } from "components/Form";
import { topRowData, tableData } from "./constant";
import { license, exhaustedLicense, expires } from "components/Images";
// import { PageConst } from "App/AppConstant";
import { salesConstant } from "./constant";


class Sales extends Component {
  topRowUi = () => {
    try {
      return topRowData.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
          <Card className="box">
            <div className="content">
              <h3 className="name">{a.name}</h3>
              <h1 className="number">{a.value}</h1>
            </div>
            <Image
              width={70}
              src={
                i === 0
                  ? license
                  : i === 1
                  ? exhaustedLicense
                  : i === 2
                  ? expires
                  : ""
              }
              preview={false}
              className="topImg"
            />
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SelesStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Row gutter={40}>{this.topRowUi()}</Row>
            <div className="salesListDiv">
              <div className="headerDiv">
                <h2>{salesConstant.saleslist}</h2>
                <div className="adsDiv">
                  <div className="btn" onClick={() => this.props.history.push("/add-new-sales")}>
                    <PlusOutlined />
                    {salesConstant.addSale}
                  </div>
                </div>
              </div>
              <div className="tableDiv">
                <Table type="sales" data={tableData} size={10} />
              </div>
            </div>
          </div>
        </div>
      </SelesStyle>
    );
  }
}

export default Sales;
