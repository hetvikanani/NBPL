import React, { Component } from "react";
import { Modal, Tabs } from "antd";
import { withRouter } from "react-router";
// import { PartnersStyle } from "./style";
import { connect } from "react-redux";
import { getPartnerById, changePartnerData } from "redux/partner/action";
import { PartnersConst } from "./constant";
// import { partnerConst } from "modules/config";

const { TabPane } = Tabs;

class View extends Component {
  componentDidMount() {
    try {
      this.props.getPartnerById(this.props.data.partnerId);
      //   this.props.changePartnerData(null, null);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { data, partner } = this.props;
    console.log(partner, "partner", data);
    return (
      <Modal
        visible={this.props.view}
        onCancel={this.props.modelCancle}
        data={this.props.data}
        bodyStyle={{ height: "17rem" }}
      >
        <Tabs centered>
          <TabPane tab="Basic Details" key="1">
            <table>
              <tr>
                <td>{PartnersConst.companyname}</td>
                <td className="tableData">{PartnersConst.colon}</td>
                <td>{partner.companyName}</td>
              </tr>
              <tr>
                <td>{PartnersConst.email}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.emailId}</td>
              </tr>
              <tr>
                <td>{PartnersConst.mobile}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.mobile}</td>
              </tr>
              <tr>
                <td>{PartnersConst.gst}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.gstType}</td>
              </tr>
              <tr>
                <td>{PartnersConst.gstno}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.gstNumber}</td>
              </tr>
              <tr>
                <td>{PartnersConst.pan}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.pan}</td>
              </tr>
              <tr>
                <td>{PartnersConst.aadhar}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.aadharNumber}</td>
              </tr>
            </table>
          </TabPane>
          <TabPane tab="Financial Details" key="2">
            <table>
              <tr>
                <td>{PartnersConst.bank}</td>
                <td className="tableData">:</td>
                <td>{partner.bankName}</td>
              </tr>
              <tr>
                <td>{PartnersConst.branch}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.branchName}</td>
              </tr>
              <tr>
                <td>{PartnersConst.address}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.address}</td>
              </tr>
              <tr>
                <td>{PartnersConst.account}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.accountNumber}</td>
              </tr>
              <tr>
                <td>{PartnersConst.ifsc}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.ifsc}</td>
              </tr>
              <tr>
                <td>{PartnersConst.pincode}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.pincode}</td>
              </tr>
              <tr>
                <td>{PartnersConst.state}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.state}</td>
              </tr>
              <tr>
                <td>{PartnersConst.city}</td>
                <td className="tableData">{PartnersConst.colon} </td>
                <td>{partner.city}</td>
              </tr>
            </table>
          </TabPane>
          <TabPane tab="Contact Details" key="3">
            <div style={{ overflow: "auto", height: "170px" }}>
              {partner.contactDetails.map((d) => {
                return (
                  <table>
                    <tr>
                      <td>{PartnersConst.contactname}</td>
                      <td className="tableData">{PartnersConst.colon}</td>
                      <td>{d.contactName}</td>
                    </tr>
                    <tr>
                      <td>{PartnersConst.mobile}</td>
                      <td className="tableData">{PartnersConst.colon} </td>
                      <td>{d.mobile}</td>
                    </tr>
                    <tr>
                      <td>{PartnersConst.email}</td>
                      <td className="tableData">{PartnersConst.colon} </td>
                      <td>{d.emailId}</td>
                    </tr>
                    <tr>
                      <td>{PartnersConst.designation}</td>
                      <td className="tableData">{PartnersConst.colon} </td>
                      <td>{d.designation}</td>
                    </tr>
                  </table>
                );
              })}
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  error: state.partner.error,
  message: state.partner.message,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  getPartnerById: (id) => dispatch(getPartnerById(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));
