import React, { Component } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import { UserListStyle } from "./style";
import { Menu, Header, Table, Input } from "components/Form";
import { tableData,UserListConst } from "./constant";
import { ButtonConst } from "App/AppConstant";
class UserList extends Component {
  render() {
    return (
      <UserListStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <div className="headDiv">
              <h2>{UserListConst.userList}</h2>
              <div
                className="addButton pointer"
                onClick={() => this.props.history.push("/add-new-user")}
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
            <Table type="userList" data={tableData} size={10} />
          </div>
        </div>
      </UserListStyle>
    );
  }
}
export default UserList;
