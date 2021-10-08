import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Modal } from "antd";
import View from "./view";

import { PartnersStyle } from "./style";
import { Menu, Header, Table, Input, Pagination } from "components/Form";
import { PartnersConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner } from "redux/partner/action";
import { partnerConst } from "modules/config";
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
    var s = {
      parameter: "",
      pageSize: "10",
      page: currentPage.toString(),
      sortColumn: "partnerid desc",
    };
    await this.props.getPartners(s);
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
  exportUI = (text) => {
    try {
      return <div className="exportAction pointer">{text}</div>;
    } catch (error) {
      console.log(error);
    }
  };

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

  viewPartner = (data) => {
    console.log("model pewno", data);
    this.setState({ viewModel: true, modelData: data });
  };

  close = () => {
    this.setState({ viewModel: false });
  };

  render() {
    const { loading, partners } = this.props;
    const { dataLength, currentPage } = this.state;
    console.log(partners, "pp");
    return (
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
              deletePartner={this.deletePartnerApi}
              edit={this.editPartnerApi}
              view={this.viewPartner}
            />
            {dataLength > 10 && (
              <div className="pagiDiv">
                <Pagination
                  onChange={this.handlePagination}
                  current={currentPage}
                  total={dataLength}
                />
              </div>
            )}
            {this.state.viewModel && (
              <View
                view={this.state.viewModel}
                data={this.state.modelData}
                modelCancle={this.close}
              />
            )}
          </div>
        </div>
      </PartnersStyle>
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
