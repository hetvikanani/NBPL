import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { PartnersStyle } from "./style";
import { Menu, Header, Table, Input, Pagination } from "components/Form";
import { PartnersConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner } from "redux/partner/action";

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLength: 0,
      currentPage: 1,
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

  deletePartnerApi = (id) => this.props.deletePartner(id);
  editPartnerApi = (id) => this.props.history.push(`partner/edit/${id}`);
  render() {
    const { loading, partners } = this.props;
    const { dataLength, currentPage } = this.state;
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
