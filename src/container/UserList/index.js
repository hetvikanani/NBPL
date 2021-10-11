import React, { Component } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserListStyle } from "./style";
import { Menu, Header, Table, Input, Pagination } from "components/Form";
import { UserListConst } from "./constant";
import { ButtonConst, RemoveConst } from "App/AppConstant";
import { deleteUser, getUsers } from "redux/user/action";

import { Modal } from "antd";

const { confirm } = Modal;
class UserList extends Component {
  constructor() {
    super();
    this.state = {
      dataLength: 0,
      currentPage: 1,
      tabData: {
        parameter: "",
        pageSize: "10",
        page: "1",
        sortColumn: "user_id",
      },
    };
  }
  async componentDidMount() {
    try {
      const { tabData } = this.state;
      await this.props.getUsers(tabData);
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
  deleteCol = async (id) => {
    try {
      confirm({
        title: RemoveConst.header + UserListConst.user,
        icon: <QuestionCircleOutlined />,
        content:
          RemoveConst.deleteMessage +
          UserListConst.user.toLowerCase() +
          RemoveConst.que,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("userList-form"),
        onOk: () => {
          this.removeCol(id);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeCol = async (id) => {
    try {
      const { tabData } = this.state;
      await this.props.deleteUser(id);
      await this.props.getUsers(tabData);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { userList } = this.props;
    const { dataLength, currentPage } = this.state;
    return (
      <UserListStyle id="userList-form">
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <div className="headDiv">
              <h2>{UserListConst.userList}</h2>
              <div
                className="addButton pointer"
                onClick={() => this.props.history.push("/user/new")}
              >
                <PlusOutlined />
              </div>
            </div>
            <div className="searchDiv">
              <Input
                placeholder={ButtonConst.search}
                suffix={<SearchOutlined />}
              />
            </div>
            <Table
              type={"userList"}
              data={userList}
              size={10}
              deleteRecord={this.deleteCol}
              editRecord={(id) =>
                this.props.history.push("/edit-user/" + window.btoa(id))
              }
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
      </UserListStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message,
  user: state.user.user,
  userList: state.user.userList,
});
const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  deleteUser: (id) => dispatch(deleteUser(id)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
