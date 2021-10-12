import React, { Component } from "react";
import { Spin } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { AdminProStyle } from "./style";
import { adminProConst } from "./constant";
import { Menu, Header, ProductAddEdit, ProductDocument } from "components/Form";
import { getProduct } from "redux/product/action";
class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: {},
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        await this.props.getProduct(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { products } = this.props;
      if (products !== prevProps.products) {
        products && products[0] && this.setState({ data: products[0] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  countInc = (data) =>
    this.setState({ count: this.state.count + 1, data: data });
  pageUI = () => {
    try {
      const { count, data } = this.state;
      return count === 0 ? (
        <ProductAddEdit countInc={this.countInc} data={data} />
      ) : (
        count === 1 && <ProductDocument data={data} />
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading,match } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <AdminProStyle>
          <Menu />
          <div className="container">
            <Header />
            <div className="allDiv anime">
              <h2>{adminProConst.products}</h2>
              <div className="formDiv anime">
                <h2>{match.params.id?adminProConst.addEditPro:adminProConst.addNewPro + adminProConst.colon}</h2>
                {this.pageUI()}
              </div>
            </div>
          </div>
        </AdminProStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.product.loading,
  error: state.product.error,
  message: state.product.message,
  products: state.product.products,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (payload) => dispatch(getProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminProduct)
);
