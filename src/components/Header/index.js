import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Modal } from "antd";
import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { RenderDrop } from "components/Form";
import { StyleComponent } from "./style";
import { setCollapsMenu } from "redux/app/actions";
import {  RemoveConst } from "App/AppConstant";
import { logo, logoWhite } from "components/Images";
import { getAuthRole, getAuthUserID } from "modules/helper";
import { headerConst } from "./constant";

var userRole = getAuthRole();
var userId = getAuthUserID();
const { confirm } = Modal;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      hidden: false,
      width: "86%",
    };
  }
  async componentDidMount() {
    try {
      // this.setWidth();
      userRole = userRole ? userRole : getAuthRole();
      userId = userId ? userId : getAuthUserID();
      let type = localStorage.auth && JSON.parse(localStorage.auth).role;
      type && this.setState({ type: type });
      // type !== "ADMIN" && (await this.props.getNotification(userId));
    } catch (error) {
      console.log(error);
    }
  }
  // componentDidUpdate(prevProps) {
  //   const { collapsed } = this.props;
  //   this.setWidth();
  //   if (collapsed !== prevProps.collapsed) {
  //     this.setWidth();
  //   }
  // }
  // setWidth = () => {
  //   try {
  //     const { width } = this.state;
  //     let item = document.getElementsByClassName("container");
  //     if (width !== item[0].clientWidth) {
  //       console.log(item[0].clientWidth);
  //       this.setState({ width: item[0].clientWidth });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  handleVisible = (visible) => this.setState({ visible });
  openMenu = async () => {
    try {
      this.handleVisible(false);
      await this.props.toggleCheckPwd(true);
    } catch (error) {
      console.log(error);
    }
  };
  logoutWarn = () => {
    try {
      this.handleVisible(false);
      confirm({
        title: RemoveConst.logout,
        icon: <QuestionCircleOutlined />,
        content: RemoveConst.logMessage,
        okText: RemoveConst.yes,
        okType: "danger",
        cancelText: RemoveConst.no,
        getContainer: () => document.getElementById("App"),
        onOk: () => {
          this.props.logout();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  readNotify = async (id) => {
    try {
      // await this.props.getReadNotification(userId + "/" + id);
      // await this.props.getNotification(userId);
    } catch (error) {
      console.log(error);
    }
  };
  allNotif = () => {
    try {
      const { notification } = this.props;
      return notification.map((a, i) => (
        <div className={`notify-border ${!a.isread ? "read" : ""}`} key={i}>
          <span className="not-mrg">
            <div className="not-txt">{a.title}</div>
            <div className="not-txt"> {a.notification}</div>
          </span>
          {!a.isread && (
            <CloseCircleOutlined
              className="croIcon"
              onClick={() => this.readNotify(a.id)}
            />
          )}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  iconUI = (cls, url) => (
    <i
      className={"fas " + cls}
      onClick={() => this.props.history.push(url)}
    ></i>
  );  
  
  render() {
    const { show, collapsed } = this.props;
    let allwidth = window.innerWidth;
    return (
      <StyleComponent className={!show ? "" : "show"}>
        <div className="maindiv" id="menu-form">
          <div className="head-container">
            <div>
              <i
                className="fa fa-bars text-white"
                onClick={() => this.props.setCollapsMenu(!collapsed)}
              ></i>
              <h4 className="text-white">{headerConst.nbl}</h4>
            </div>
            <div>
              {this.iconUI("fa-shopping-cart", "/shop")}
              {this.iconUI("fa-wallet", "/wallet")}
              {this.iconUI("fa-bell", "/shop")}
              {this.iconUI("fa-user", "/profile")}
             
              
            </div>
          </div>
          <NavLink to="/" className="flex mr-auto">
            <Image
              alt="logo"
              className="w-16"
              width={allwidth > 767 ? 180 : 70}
              src={allwidth > 767 ? logo : logoWhite}
              preview={false}
            />
          </NavLink>
        </div>
      </StyleComponent>
    );
  }
}
const mapStateToProps = (state) => ({
  collapsed: state.app.collapsed,
});
const mapStateToDispatch = (dispatch) => ({
  setCollapsMenu: (payload) => dispatch(setCollapsMenu(payload)),
});
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Header));
