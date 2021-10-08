import React, { Component } from "react";
import { Modal, Tabs } from "antd";
import { withRouter } from "react-router";
import { PartnersStyle } from "./style";
import { connect } from "react-redux";
import { getPartnerById, changePartnerData } from "redux/partner/action";
const { TabPane } = Tabs;

class View extends Component {
  async componentDidMount() {
    try {
      await this.props.getPartnerById(this.props.data.partnerId);
      //   this.props.changePartnerData(null, null);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { data, partner } = this.props;
    console.log(data, "data/n", partner, "partner");
    return (
      <PartnersStyle>
        <Modal
          visible={this.props.view}
          onCancel={this.props.modelCancle}
          data={this.props.data}
        >
          <Tabs centered>
            <TabPane tab="Basic Details" key="1">
              <table>
                <tr>
                  <td>Company Name</td>
                  <td className="tableData">:</td>
                  <td>{data.companyName}</td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td className="tableData"> : </td>
                  <td>{data.emailId}</td>
                </tr>
                <tr>
                  <td>Mobile No</td>
                  <td className="tableData"> : </td>
                  <td>{data.mobile}</td>
                </tr>
                <tr>
                  <td>GST Type</td>
                  <td className="tableData"> : </td>
                  <td>{data.gstType}</td>
                </tr>
                <tr>
                  <td>GstNumber</td>
                  <td className="tableData"> : </td>
                  <td>{data.gstNumber}</td>
                </tr>
                <tr>
                  <td>Pan</td>
                  <td className="tableData"> : </td>
                  <td>{data.pan}</td>
                </tr>
                <tr>
                  <td>AadharNumber</td>
                  <td className="tableData"> : </td>
                  <td>{data.aadharNumber}</td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Financial Details" key="2">
              <table>
                <tr>
                  <td>Bank Name</td>
                  <td className="tableData">:</td>
                  <td>{data.bankName}</td>
                </tr>
                <tr>
                  <td>Branch Name</td>
                  <td className="tableData"> : </td>
                  <td>{data.branchName}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td className="tableData"> : </td>
                  <td>{data.address}</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td className="tableData"> : </td>
                  <td>Account Number</td>
                </tr>
                <tr>
                  <td>Ifsc Code</td>
                  <td className="tableData"> : </td>
                  <td>{data.ifsc}</td>
                </tr>
                <tr>
                  <td>Pincode</td>
                  <td className="tableData"> : </td>
                  <td>{data.pincode}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td className="tableData"> : </td>
                  <td>{data.state}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td className="tableData"> : </td>
                  <td>{data.city}</td>
                </tr>
              </table>
            </TabPane>
            <TabPane tab="Contact Details" key="3">
              <table>
                <tr>
                  <td>Contact Name</td>
                  <td className="tableData">:</td>
                  <td>{data.companyName}</td>
                </tr>
                <tr>
                  <td>Mobile No</td>
                  <td className="tableData"> : </td>
                  <td>{data.mobile}</td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td className="tableData"> : </td>
                  <td>{data.emailId}</td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td className="tableData"> : </td>
                  <td>{data.address}</td>
                </tr>
              </table>
            </TabPane>
          </Tabs>
        </Modal>
      </PartnersStyle>
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
