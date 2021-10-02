import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { PartnersStyle } from "./style";
import { Menu, Header, Table, Input } from "components/Form";
import { PartnersConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner } from "redux/partner/action";

class Partners extends Component {
  async componentDidMount() {
    var s = {
      parameter: "",
      pageSize: "10",
      page: "1",
      sortColumn: "partnerid desc",
    };
    await this.props.getPartners(s);
  }
  exportUI = (text) => {
    try {
      return <div className="exportAction pointer">{text}</div>;
    } catch (error) {
      console.log(error);
    }
  };

  deletePartnerApi = (id) => this.props.deletePartner(id);

  render() {
    return (
      <PartnersStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <div className="headDiv">
              <h2>{PartnersConst.partners}</h2>
              <div
                className="addButton pointer"
                onClick={() => this.props.history.push("/add-new-partner")}
              >
                <PlusOutlined />
              </div>
            </div>
            <div className="exportDiv">
              <div className="expo">
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
            {this.props.porters.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <Table
                type="partners"
                data={this.props.porters}
                size={10}
                deletePartner={this.deletePartnerApi}
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
  porters: state.partner.partners,
});
const mapDispatchToProps = (dispatch) => ({
  getPartners: (payload) => dispatch(getPartners(payload)),
  deletePartner: (id) => dispatch(deletePartner(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Partners)
);
