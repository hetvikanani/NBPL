import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { PackageListStyle } from "./style";
import { Menu, Header, Input, Table } from "components/Form";
import { ButtonConst } from "App/AppConstant";
import { PackListConst } from "./constant";
import { getProduct } from "redux/product/action";
import { getPackageById } from "redux/subscribe/action";
class PackageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      productId: 0,
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.name) {
        this.setState({ item: match.params.name });
      }
      if (match.params.id) {
        let id = window.atob(match.params.id);
        this.setState({ productId: id });
        await this.props.getPackageById(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  editRow = (id) => {
    try {
      const { item, productId } = this.state;
      this.props.history.push(
        "/package/" +
          item +
          "/edit/" +
          window.btoa(productId) +
          "/" +
          window.btoa(id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { item, productId } = this.state;
    const { packages } = this.props;
    return (
      <PackageListStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <div className="headDiv">
              <h2>{item + PackListConst.packList}</h2>
              <div
                className="addButton pointer"
                onClick={() =>
                  this.props.history.push(
                    "/package/" + item + "/new/" + window.btoa(productId)
                  )
                }
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
            <Table
              type="packageList"
              data={packages}
              size={10}
              edit={this.editRow}
            />
          </div>
        </div>
      </PackageListStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.subscribe.loading,
  error: state.subscribe.error,
  message: state.subscribe.message,
  packages: state.subscribe.packages,
});
const mapDispatchToProps = (dispatch) => ({
  getPackageById: (payload) => dispatch(getPackageById(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PackageList)
);
