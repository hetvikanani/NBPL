import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Spin } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import ViewApi from "./viewApi";
import { PartnersStyle } from "./style";
import { Menu, Header, Table, Input, Pagination } from "components/Form";
import { PartnersConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner } from "redux/partner/action";

const { confirm } = Modal;

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLength: 0,
      currentPage: 1,
      viewModel: false,
      modelData: {},
    };
  }
  async componentDidMount() {
    const { currentPage } = this.state;
    var para = {
      parameter: "",
      pageSize: "10",
      page: currentPage.toString(),
      sortColumn: "partnerid desc",
    };
    await this.props.getPartners(para);
  }
  componentDidUpdate(prevProps) {
    try {
      const { partners } = this.props;
      if (partners !== prevProps.partners) {
        if (partners && partners.length > 0)
          this.setState({ dataLength: partners[0].totalLenght });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handlePagination = async (val) => {
    var para = {
      parameter: "",
      pageSize: "10",
      page: val.toString(),
      sortColumn: "partnerid desc",
    };
    await this.props.getPartners(para);
    this.setState({ currentPage: val.current });
  };
  exportUI = (text) => <div className="exportAction pointer">{text}</div>;
  deletePartnerApi = (id) => {
    try {
      confirm({
        title: PartnersConst.title,
        icon: <QuestionCircleOutlined />,
        content: PartnersConst.content,
        okText: PartnersConst.yes,
        okType: "danger",
        cancelText: PartnersConst.no,
        onOk: () => {
          this.props.deletePartner(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  editPartnerApi = (id) => this.props.history.push(`partner/edit/${id}`);
  viewPartner = (data) => this.setState({ viewModel: true, modelData: data });
  close = () => this.setState({ viewModel: false });
  render() {
    const { loading } = this.props;
    const { dataLength, currentPage } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <PartnersStyle>
          <Menu />
          <div className="container">
            <Header />
            <div className="allDiv anime">
              <div className="headDiv anime">
                <h2>{PartnersConst.partners}</h2>
                <div
                  className="addButton pointer"
                  onClick={() => this.props.history.push("/partner/new")}
                >
                  <PlusOutlined />
                </div>
              </div>
              <div className="exportDiv">
                <div className="expo anime">
                  {this.exportUI("COPY")}
                  {this.exportUI("CSV")}
                  {this.exportUI("EXCEL")}
                  {this.exportUI("PDF")}
                  {this.exportUI("PRINT")}
                </div>
                <div className="searchDiv">
                  <Input
                    placeholder={ButtonConst.search}
                    suffix={<SearchOutlined />}
                  />
                </div>
              </div>
              <Table
                type="partners"
                data={this.props.partners}
                deleteRecord={this.deletePartnerApi}
                editRecord={this.editPartnerApi}
                viewRecord={this.viewPartner}
              />
              {dataLength > 10 && (
                <div className="pagiDiv">
                  <Pagination
                    onChange={this.handlePagination}
                    current={currentPage}
                    total={dataLength}
                    pageSize={10}
                  />
                </div>
              )}
              {/* {this.state.viewModel && (
              <View
                view={this.state.viewModel}
                data={this.state.modelData}
                modelCancle={this.close}
              />
            )} */}
              {this.state.viewModel && (
                <ViewApi
                  view={this.state.viewModel}
                  data={this.state.modelData}
                  modelCancle={this.close}
               
                />
              )}
            </div>
          </div>
        </PartnersStyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  error: state.partner.error,
  message: state.partner.message,
  partners: state.partner.partners,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartners: (payload) => dispatch(getPartners(payload)),
  deletePartner: (id) => dispatch(deletePartner(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Partners)
);
