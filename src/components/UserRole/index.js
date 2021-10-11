import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Checkbox } from "components/Form";

import { UserRoleStyle } from "./style";
import { userRoleConst } from "./constant";
import { saveUser } from "redux/user/action";
import { ButtonConst } from "App/AppConstant";

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      isChecked: false,
      checkboxes: [],
      initState: {
        rightsid: "",
      },
      tableArray: [],
    };
  }
  async componentDidMount() {
    try {
      const { userById } = this.props;
      let ids = [];
      if (userById && userById.rights) {
        userById.rights.forEach((a, i) => {
          if (a.ischeck === 1) ids.push(a.rightsId);
        });
        this.setRigths(ids);
      } else this.setRigths([]);
    } catch (error) {
      console.log(error);
    }
  }
  setRigths = (ids) => {
    try {
      let data = [];
      for (let i = 0; i < 3; i++) {
        data.push({
          id: i,
          value: i === 0 ? "Partners" : i === 1 ? "Products" : "Users",
          add: ids.includes(i === 0 ? 1 : i === 1 ? 5 : 9),
          edit: ids.includes(i === 0 ? 2 : i === 1 ? 6 : 10),
          view: ids.includes(i === 0 ? 3 : i === 1 ? 7 : 11),
          delete: ids.includes(i === 0 ? 4 : i === 1 ? 8 : 12),
        });
      }
      this.setState({ tableArray: data });
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async ({ setSubmitting }) => {
    try {
      const { data } = this.props;
      const { tableArray } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let count = 1;
      let rights = [];
      tableArray.forEach((a) => {
        if (a.add) rights.push({ rightsid: count });
        count = count + 1;
        if (a.edit) rights.push({ rightsid: count });
        count = count + 1;
        if (a.view) rights.push({ rightsid: count });
        count = count + 1;
        if (a.delete) rights.push({ rightsid: count });
        count = count + 1;
      });
      data.rights = rights;
      await this.props.saveUser(data);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  tableBodyUI = () => {
    try {
      const { tableArray } = this.state;
      return tableArray.map((a, i) => (
        <tr key={i} className="anime">
          <td className="text">{a.value}</td>
          {this.tdUI(a.all, i, a, 0)}
          {this.tdUI(a.add, i, a, 1)}
          {this.tdUI(a.edit, i, a, 2)}
          {this.tdUI(a.view, i, a, 3)}
          {this.tdUI(a.delete, i, a, 4)}
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
  tdUI = (type, i, a, inx) => (
    <td>
      <Checkbox checked={type} onChange={() => this.onChange(i, a, inx)} />
    </td>
  );
  render() {
    const { btnDisable } = this.state;
    return (
      <UserRoleStyle>
        <div className="tableDiv">
          <table>
            <thead>
              <tr className="anime">
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
          <div className="nextDiv">
            <Button onClick={() => this.props.history.push("/users")}>
              {ButtonConst.cancel}
            </Button>
            <Button
              disabled={btnDisable}
              onClick={this.handleSubmit}
              htmlType="submit"
            >
              {ButtonConst.submit}
            </Button>
          </div>
        </div>
      </UserRoleStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message,
  user: state.user.user,
  userById: state.user.userById,
});
const mapDispatchToProps = (dispatch) => ({
  saveUser: (payload) => dispatch(saveUser(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserRole)
);
