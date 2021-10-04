import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";

import { PartnersStyle } from "./style";
import { Menu, Header, Table, Input } from "components/Form";
import { PartnersConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
import { getPartners, deletePartner,getPartnerById } from "redux/partner/action";

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

  editPartnerById=(id)=>this.props.getPartnerById(id);

  render() {
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
              />
           
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
  partner:state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartners: (payload) => dispatch(getPartners(payload)),
  deletePartner: (id) => dispatch(deletePartner(id)),
  getPartnerById:(id)=>dispatch(getPartnerById(id)),

});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Partners)
);
