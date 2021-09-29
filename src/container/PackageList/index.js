import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import { PackageListStyle } from "./style";
import { Menu, Header, Input, Table } from "components/Form";
import { ButtonConst } from "App/AppConstant";
import { tableData,PackListConst } from "./constant";

class PackageList extends Component {
  constructor() {
    super();
    this.state = { item: "" };
  }
  componentDidMount() {
    try {
      const { match } = this.props;

      if (match.params.name) {
        this.setState({ item: match.params.name });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
      const {item}=this.state;
    return (
      <PackageListStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <div className="headDiv">
              <h2>{item + PackListConst.packList}</h2>
              <div className="addButton pointer"
              onClick={() => this.props.history.push("/add-new-package")}
              >
                <PlusOutlined />
              </div>
            </div>
            <div className="searchDiv">
              <Input
                placeholder={ButtonConst.search}
                suffix={<SearchOutlined />}
              />
            </div>
            <Table type="packageList" data={tableData} size={10} />
          </div>
        </div>
      </PackageListStyle>
    );
  }
}
export default withRouter(PackageList);
