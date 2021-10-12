import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Modal } from "antd";
import { connect } from "react-redux";
import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { Theme } from "App/theme";
import { headConst } from "./constant";
import { StyleComponent } from "./style";
import { RemoveConst } from "App/AppConstant";
import { setCollapsMenu } from "redux/app/actions";
import { logout } from "redux/login/actions";
import { RenderDrop, Button } from "components/Form";
import { getAuthRole, getAuthUserID } from "modules/helper";
import {
  logo,
  logoWhite,
  logoutImg,
  lock,
  profile,
  user,
} from "components/Images";

var userRole = getAuthRole();
var userId = getAuthUserID();
const { confirm } = Modal;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      hidden: false,
      read: false,
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
  componentDidUpdate(prevProps) {
    // const { collapsed } = this.props;
    // this.setWidth();
    // if (collapsed !== prevProps.collapsed) {
    //   this.setWidth();
    // }
    const { notification } = this.props;
    if (notification !== prevProps.notification) {
      let read = false;
      notification.forEach((a) => {
        if (a.isread === 0) read = true;
      });
      this.setState({ read });
    }
  }
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
  iconUI = (cls, url) => (
    <i
      className={"fas " + cls}
      onClick={() => this.props.history.push(url)}
    ></i>
  );
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
      confirm({
        title: RemoveConst.logout,
        icon: <QuestionCircleOutlined />,
        okText: RemoveConst.yes,
        cancelText: RemoveConst.no,
        content: RemoveConst.logMessage,
        okType: "danger",
        getContainer: () => document.getElementById("App"),
        onOk: () => {
          this.props.logout();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  allNotif = () => {
    try {
      const { notification } = this.props;
      return notification.map((a, i) => (
        <div
          key={i}
          className={`notify-border ${!a.isread ? "read" : ""}`}
          onClick={() => this.redirect(a.title, a.id)}
        >
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
  render() {
    const { show, collapsed, history } = this.props;
    // const { read } = this.state;notification
    let allwidth = window.innerWidth;
    let admin =
      localStorage.auth && JSON.parse(localStorage.auth).role === "admin";
    return (
      <StyleComponent className={!show ? "" : "show"}>
        <div
          className="maindiv"
          id="menu-form"
          style={{ backgroundColor: admin ? Theme.adColor : Theme.mainColor }}
        >
          <div className="head-container">
            <div>
              <i
                className="fa fa-bars text-white"
                onClick={() => this.props.setCollapsMenu(!collapsed)}
              ></i>
              <h4 className="text-white">
                {admin ? headConst.admin : headConst.nbl}
              </h4>
            </div>
            <div className="dropDiv">
              {!admin && (
                <>
                  {this.iconUI("fa-shopping-cart", "/shop")}
                  {this.iconUI("fa-wallet", "/wallet")}
                  <div className="headIcon">
                    <RenderDrop item={<i className="fas fa-bell"></i>}>
                      <div className="head-mrg">
                        <div className="notify-Txthead">
                          {/* {notification.length === 0 && headConst.no} */}
                          {headConst.notif}
                          {/* {notification.length > 0 && read && (<Button className="v-btn" onClick={() => this.readNotify(0)}>{headConst.va}</Button>)} */}
                        </div>
                      </div>
                      <div className="notify-scroll"> {this.allNotif()}</div>
                    </RenderDrop>
                  </div>
                </>
              )}
              <RenderDrop
                item={
                  admin ? (
                    <Image src={profile} width={30} preview={false} />
                  ) : (
                    <i className={"fas fa-user"}></i>
                  )
                }
                data={[
                  <div onClick={() => history.push("/profile")}>
                    <Image src={user} width={18} preview={false} />
                    <div className="title">{headConst.profile}</div>
                  </div>,
                  <div onClick={() => history.push("/change-password")}>
                    <Image src={lock} preview={false} width={20} />
                    <div className="title">{headConst.changePwd}</div>
                  </div>,
                  <div onClick={() => this.logoutWarn()}>
                    <Image src={logoutImg} preview={false} width={20} />
                    <div className="title">{RemoveConst.logout}</div>
                  </div>,
                ]}
              />
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
  logout: () => dispatch(logout()),
});
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Header));
