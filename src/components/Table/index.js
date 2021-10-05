import React, { Component } from "react";
import TableStyle from "./style";
import { Table, Image } from "antd";
import { DashOutlined } from "@ant-design/icons";

import {
  editPen,
  deleteImg,
  infoImg,
  view,
  edit,
  wallet,
  prospect,
  sales,
  deleteSvg,
} from "components/Images";
import { TableConst } from "./constant";
import { RenderDrop } from "components/Form";
import { withRouter } from "react-router";

const { Column } = Table;

class TableUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { current: 1, pageSize: 5 },
    };
  }
  handleTable = (pagination) => this.setState({ pagination });
  StatusUI = (record) => {
    try {
      return (
        <div className="statusUI">
          <span className={record.isActive === 0 ? "green" : "red"}>
            {record.isActive === 0 ? "Active" : "Deactive"}
          </span>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  adminActUI = (img, text) => (
    <>
      <Image src={img} preview={false} width={15} />
      <span className="text">{text}</span>
    </>
  );

  adminActionUI = (record, type) => {
    try {
      return (
        <div className="actionUI">
          <RenderDrop overlayClassName="actionUI"
            item={<DashOutlined className="dash" />}
            data={[
              type === "partners" && (
                <div className="actionBtn" onClick={() => this.props.view()}>
                  {this.adminActUI(view, TableConst.view)}
                </div>
              ),
              <div className="actionBtn" onClick={() => this.props.edit(record.partnerId)}>
                {this.adminActUI(edit, TableConst.edit)}
              </div>,
              type === "partners" && (
                <div className="actionBtn" onClick={() => this.props.wallet()}>
                  {this.adminActUI(wallet, TableConst.wallet)}
                </div>
              ),
              type === "partners" && (
                <div
                  className="actionBtn"
                  onClick={() => this.props.prospect()}
                >
                  {this.adminActUI(prospect, TableConst.prospect)}
                </div>
              ),
              type === "partners" && (
                <div className="actionBtn" onClick={() => this.props.sales()}>
                  {this.adminActUI(sales, TableConst.sales)}
                </div>
              ),
              <div className="actionBtn" onClick={() => this.props.deletePartner(record.partnerId)}>
                {this.adminActUI(deleteSvg, TableConst.delete)}
              </div>,
            ]}
          />
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  action = (record, type) => {
    try {
      return (
        <div className="actionUI">
          <div>
            <Image
              className="pointer"
              src={infoImg}
              preview={false}
              width={13}
            />
          </div>
          <div className="edite_box">
            <Image
              className="pointer"
              src={editPen}
              preview={false}
              width={13}
            />
          </div>
          <div>
            <Image
              className="pointer"
              src={deleteImg}
              preview={false}
              width={13}
            />
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  };
  columns = () => {
    try {
      const { type } = this.props;
      return (
        <>
          {type === "MyProspect" && (
            <Column title={TableConst.ProName} dataIndex={"name"} />
          )}
          {type === "MyLeads" && (
            <Column title={TableConst.leadName} dataIndex={"name"} />
          )}
          {(type === "MyLeads" || type === "MyProspect") && (
            <Column title={TableConst.contNum} dataIndex={"number"} />
          )}
          {type === "MyDemo" && (
            <>
              <Column title={TableConst.cusName} dataIndex={"name"} />
              <Column title={TableConst.pro} dataIndex={"name"} />
            </>
          )}
          {(type === "sales" || type === "admin_sales") && (
            <>
              {type === "sales" && (
                <>
                  <Column title={TableConst.srNo} dataIndex={"key"} />
                  <Column title={TableConst.liceId} dataIndex={"li"} />
                </>
              )}
              <Column title={TableConst.cusName} dataIndex={"cn"} />
              <Column title={TableConst.subType} dataIndex={"st"} />
              {type === "admin_sales" && (
                <>
                  <Column title={"Time"} dataIndex={"time"} />
                  <Column title={"Amount"} dataIndex={"amount"} />
                </>
              )}
              {type === "sales" && (
                <Column title={TableConst.expIn} dataIndex={"ei"} />
              )}
            </>
          )}

          {type === "wallet" && (
            <>
              <Column title={"Transaction ID"} dataIndex={"key"} />
              <Column title={"Details"} dataIndex={"details"} />
              <Column title={"Transaction Type"} dataIndex={"trType"} />
              <Column title={"Date"} dataIndex={"date"} />
              <Column title={"Amount"} dataIndex={"amount"} />
            </>
          )}
          {(type === "partners" ||
            type === "userList" ||
            type === "packageList") && (
            <>
              <Column
                title={TableConst.srNo}
                dataIndex={"key"}
                className="center"
              />
              {type === "partners" && (
                <>
                  <Column
                    title={"Partner"}
                    dataIndex={"companyName"}
                    className="center"
                  />
                  <Column
                    title={TableConst.status}
                    className="center"
                    render={(record) => this.StatusUI(record)}
                  />
                </>
              )}
              {type === "userList" && (
                <>
                  <Column
                    title={"User Name"}
                    dataIndex={"username"}
                    className="center"
                  />
                  <Column
                    title={"Email id"}
                    dataIndex={"emailid"}
                    className="center"
                  />
                </>
              )}
              {type === "packageList" && (
                <>
                  <Column
                    title={"Package Type"}
                    dataIndex={"packageType"}
                    className="center"
                  />
                  <Column
                    title={"Subscription Type"}
                    dataIndex={"subsType"}
                    className="center"
                  />
                </>
              )}
              <Column
                className="center"
                title={TableConst.action}
                render={(record, i) => this.adminActionUI(record, type)}
              />
            </>
          )}

          {type !== "wallet" &&
            type !== "partners" &&
            type !== "userList" &&
            type !== "admin_sales" && (
              <Column
                title={TableConst.action}
                render={(record, i) => this.action(record, type)}
              />
            )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  //   searchData = () => {
  //     try {
  //       const { data, search, type } = this.props;
  //       let dData = [];
  //       let display = [];
  //       data &&
  //         data.length > 0 &&
  //         data.forEach((a) => {
  //           display.push(
  //             a.name,
  //             a.from,
  //             a.to,
  //             a.code,
  //             a.location,
  //             a.designation,
  //             a.isdisable === 0 ? TableConst.active : TableConst.disable
  //           );
  //           type === "porter" && display.push(a.number, a.email);
  //           let array = [];
  //           display.forEach((e) => {
  //             if (e && e !== null && e.toString().length > 0) array.push(e);
  //           });
  //           let matches = array.filter((s) =>
  //             s.toString().toLowerCase().includes(search.toString().toLowerCase())
  //           );
  //           display = [];
  //           if (matches && matches.length > 0) dData.push(a);
  //         });
  //       return dData;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  render() {
    // const { pagination } = this.state;
    const { data, search, size, print } = this.props;
    let display = !search || search.trim() === "" ? data : this.searchData();
    display &&
      display.forEach((a, i) => {
        a.key = i + 1;
      });
    let pageSize = size ? size : 5;
    return (
      <TableStyle>
        <Table
          bordered
          rowClassName={!print ? "anime" : ""}
          pagination={false}
          onChange={this.handleTable}
          dataSource={display}
        >
          {this.columns()}
        </Table>
      </TableStyle>
    );
  }
}
export default withRouter(TableUI);
