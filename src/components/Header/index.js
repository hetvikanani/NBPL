import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Modal, Popover } from "antd";
import { connect } from "react-redux";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";

import { headConst } from "./constant";
import { StyleComponent } from "./style";
import { RemoveConst } from "App/AppConstant";
import { setCollapsMenu } from "redux/app/actions";
import { getAuthRole, getAuthUserID } from "modules/helper";
import { logo, logoWhite, logout, lock, profile } from "components/Images";
import { Theme } from "App/theme";

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
  iconUI = (cls, url) => (
    <i
      className={"fas " + cls}
      onClick={() => this.props.history.push(url)}
    ></i>
  );
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
        onOk: () => this.props.logout(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { show, collapsed } = this.props;
    let allwidth = window.innerWidth;
    let title = { lineHeight: "1.3em", marginLeft: "10px" };
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
            <div>
              {!admin && (
                <>
                  {this.iconUI("fa-shopping-cart", "/shop")}
                  {this.iconUI("fa-wallet", "/wallet")}
                  {this.iconUI("fa-bell", "/shop")}
                </>
              )}
              <Popover
                visible={this.state.visible}
                onVisibleChange={this.handleVisible}
                style={{ top: "26" }}
                content={
                  <div>
                    <div
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        marginBottom: "8px",
                      }}
                      onClick={() => this.props.history.push("/profile")}
                    >
                      <UserOutlined
                        style={{
                          color: "#b5b5b5",
                          fontSize: "1.2em",
                          marginRight: "4px",
                        }}
                      />
                      <div style={title}>{headConst.profile}</div>
                    </div>
                    <div
                      style={{ display: "flex", cursor: "pointer" }}
                      // onClick={this.openMenu}
                      onClick={() =>
                        this.props.history.push("/change-password")
                      }
                    >
                      <Image src={lock} preview={false} width={20} />
                      <div style={title}>{headConst.changePwd}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        marginTop: "12px",
                      }}
                      onClick={this.logoutWarn}
                    >
                      <Image src={logout} preview={false} width={20} />
                      <div style={title}>{RemoveConst.logout}</div>
                    </div>
                  </div>
                }
                trigger="click"
                placement="bottomRight"
              >
                {admin ? (
                  <Image src={profile} width={30} preview={false}></Image>
                ) : (
                  <i className={"fas fa-user"}></i>
                )}
              </Popover>
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
