import React, { Component } from "react";

import { UserRoleStyle } from "./style";
import { Label, Button, Select, Checkbox } from "components/Form";
// import { PageConst, ButtonConst } from "App/AppConstant";
import {userRoleConst} from "./constant";

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      userRole: "",
      userRoleError: false,
      tableArray: [
        {
          id: 0,
          value: "Partners",
          all: false,
          add: false,
          edit: false,
          view: false,
          delete: false,
        },
        {
          id: 1,
          value: "Products",
          all: false,
          add: false,
          edit: false,
          view: false,
          delete: false,
        },
        {
          id: 0,
          value: "Users",
          all: false,
          add: false,
          edit: false,
          view: false,
          delete: false,
        },
      ],
    };
  }  
  handleSelect=(e)=>{
    
    this.setState({
      userRole: e,
      userRoleError: false,
    });
  }
  handleSubmit = () => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let flag = false;
      let userRole = this.state.userRole;
      if (userRole === "") {
        this.setState({
          userRoleError: true,
        });
        flag = true;
      }
    } catch (error) {
      console.log(error);
    }
  };


  tableBodyUI = () => {
    try {
      const { tableArray } = this.state;
      return tableArray.map((a, i) => (
        <tr key={i}>
          <td className="text">{a.value}</td>
          {this.tdUI(a.all,i, a, 0)}
          {this.tdUI(a.add,i, a, 1)}
          {this.tdUI(a.edit,i, a, 2)}
          {this.tdUI(a.view,i, a, 3)}
          {this.tdUI(a.delete,i, a, 4)}
        </tr>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  onChange = (i, a, idx) => {
    try {
      const { tableArray } = this.state;
      let array = [...tableArray];
      array[i] = {
        id: a.id,
        value: a.value,
        all: idx === 0 ? !a.all : false,
        add: idx === 1 ? !a.add : idx === 0 ? !a.all : a.add,
        edit: idx === 2 ? !a.edit : idx === 0 ? !a.all : a.edit,
        view: idx === 3 ? !a.view : idx === 0 ? !a.all : a.view,
        delete: idx === 4 ? !a.delete : idx === 0 ? !a.all : a.delete,
      };
      if (array[i].add && array[i].edit && array[i].view && array[i].delete)
        array[i].all = true;
      this.setState({ tableArray: array });
    } catch (error) {
      console.log(error);
    }
  };
  tdUI=(type,i, a, inx)=>  <td>
  <Checkbox
    checked={type}
    onChange={() => this.onChange(i, a, inx)}
  />
</td>
  render() {
    const { btnDisable, userRole, userRoleError } = this.state;
    return (
      <UserRoleStyle>
        <div className="field">
          <Label
            title={userRoleConst.userRole}
            className={userRoleError ? "empty" : ""}
          />
          <Select
            value={userRole}
            onChange={this.handleSelect}
            data={["India", "US"]}
            selectClass={userRoleError ? "empty" : ""}
          />
        </div>
        <div className="tableDiv">
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>{userRoleConst.all}</th>
                <th>{userRoleConst.add}</th>
                <th>{userRoleConst.edit}</th>
                <th>{userRoleConst.view}</th>
                <th>{userRoleConst.delete}</th>
              </tr>
            </thead>
            <tbody>{this.tableBodyUI()}</tbody>
          </table>
        </div>

        <div className="btnDiv">
          <Button disabled={btnDisable} onClick={this.handleSubmit}>
            {userRoleConst.submit}
          </Button>
        </div>
      </UserRoleStyle>
    );
  }
}
export default UserRole;
