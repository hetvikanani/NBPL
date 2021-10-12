import React, { Component } from "react";
import { Row, Col, Card, Image, Spin, Modal, Popover } from "antd";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import { ProductStyle } from "./style";
import { Menu, Header } from "components/Form";
import { Clr, ProductConst } from "./constant";
import { RemoveConst } from "App/AppConstant";
import { view, edit, packag, deleteSvg } from "components/Images";
import { getProduct, deleteProduct } from "redux/product/action";
import { configVar } from "modules/config";
const { confirm } = Modal;
class products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
    };
  }
  async componentDidMount() {
    try {
      let role = localStorage.auth && JSON.parse(localStorage.auth).role;
      role && this.setState({ role: role });
      await this.props.getProduct();
    } catch (error) {
      console.log(error);
    }
  }
  deleteProduct = async (val) => {
    try {
      confirm({
        title: RemoveConst.header + ProductConst.product,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          ProductConst.product.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("products_div"),
        onOk: () => {
          this.deleteCol(val);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteCol = async (id) => await this.props.deleteProduct(id);
  CardUI = () => {
    try {
      const { products } = this.props;
      const { role } = this.state;
      let clrs = Clr;
      let length =
        products && products.length > 6 ? Math.ceil(products.length / 6) : 0;
      if (length > 1) for (let i = length - 1; i--; ) clrs = clrs.concat(Clr);
      return products.map((a, i) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} key={i}>
          <Card className="main-card-div anime">
            <div
              className="head-box"
              style={{ backgroundColor: Clr[i] }}
              onClick={() =>
                this.props.history.push(
                  "/productDetail/" +
                    a.productname.split(" ")[0] +
                    "/" +
                    window.btoa(a.productId)
                )
              }
            >
              <Image
                src={configVar.BASE_URL + a.productLogo}
                preview={false}
                className="img-div"
                height={30}
              />
            </div>
            <div className="contant_div">
              <div className="heding_div">
                <h3>{a.productname}</h3>
                <h3>{a.productTitle}</h3>
              </div>
            </div>
            <p
              className="pere_con_div"
              dangerouslySetInnerHTML={{ __html: a.productDescription }}
            />
            {role === "admin" ? (
              <div className="actionDiv">
                <Popover content={"View"} trigger="hover">
                  <div
                    className="acLogDiv pointer"
                    onClick={() =>
                      this.props.history.push(
                        "/productDetail/" +
                          a.productname.split(" ")[0] +
                          "/" +
                          window.btoa(a.productId)
                      )
                    }
                  >
                    <Image src={view} preview={false} width={15} />
                  </div>
                </Popover>
                <Popover content={"Edit"} trigger="hover">
                  <div
                    className="acLogDiv pointer"
                    onClick={() =>
                      this.props.history.push(
                        "product/edit/" + window.btoa(a.productId)
                      )
                    }
                  >
                    <Image src={edit} preview={false} width={15} />
                  </div>
                </Popover>
                <Popover content={"Package List"} trigger="hover">
                  <div
                    className="acLogDiv pointer"
                    onClick={() =>
                      this.props.history.push(
                        "/package-list/" +
                          a.productname.split(" ")[0] +
                          "/" +
                          window.btoa(a.productId)
                      )
                    }
                  >
                    <Image src={packag} preview={false} width={20} />
                  </div>
                </Popover>
                <Popover content={"Delete Product"} trigger="hover">
                  <div
                    className="acLogDiv pointer"
                    onClick={() => this.deleteProduct(a.productId)}
                  >
                    <Image src={deleteSvg} preview={false} width={15} />
                  </div>
                </Popover>
              </div>
            ) : (
              <NavLink to={"/productDetail/" + a.productname.split(" ")[0]}>
                {ProductConst.viewMore}
              </NavLink>
            )}
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { loading } = this.props;
    const { role } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <ProductStyle id="products_div">
          <Menu />
          <div className="container">
            <Header />
            <div className="allDiv">
              <div className="headDiv">
                <h2>{ProductConst.nblPro}</h2>
                {role === "admin" && (
                  <div
                    className="addButton pointer"
                    onClick={() => this.props.history.push("/product/new")}
                  >
                    <PlusOutlined />
                  </div>
                )}
              </div>
              <div className="products_div">
                <Row gutter={25}>{this.CardUI()}</Row>
              </div>
            </div>
          </div>
        </ProductStyle>
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
  deleteProduct: (payload) => dispatch(deleteProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(products)
);
