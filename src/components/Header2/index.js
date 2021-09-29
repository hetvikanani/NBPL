import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Modal ,Popover} from "antd";
import { header2Const } from "./constant";

// import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { RenderDrop } from "components/Form";
import { StyleComponent } from "./style";
import { setCollapsMenu } from "redux/app/actions";
import { RemoveConst } from "App/AppConstant";
import { logo, logoWhite ,logout,lock} from "components/Images";
import { getAuthRole, getAuthUserID } from "modules/helper";

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
        title: header2Const.logout,
        icon: <QuestionCircleOutlined />,
        content: RemoveConst.logMessage,
        // okText: RemoveConst.yes,
        // okType: "danger",
        // cancelText: RemoveConst.no,
        // getContainer: () => document.getElementById("App"),
        // onOk: () => {
        //   this.props.logout();
        // },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  render() {
    const { show, collapsed } = this.props;
    let allwidth = window.innerWidth;
    let title = { lineHeight: "1.3em", marginLeft: "10px" };
    return (
      <StyleComponent className={!show ? "" : "show"}>
        <div className="maindiv" id="menu-form">
          <div className="head-container">
            <div>
              <i
                className="fa fa-bars text-white"
                onClick={() => this.props.setCollapsMenu(!collapsed)}
              ></i>
              <h4 className="text-white">{header2Const.nbl}</h4>
            </div>
            <div>
              {this.iconUI("fa-shopping-cart", "/shop")}
              {this.iconUI("fa-wallet", "/wallet")}
              {this.iconUI("fa-bell", "/shop")}
              {/* {this.iconUI("fa-user", "/profile")} */}
             
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
                      <div style={title}>{header2Const.profile}</div>
                    </div>
                 
                  <div
                    style={{
                      display: "flex",
                      cursor: "pointer",
                    }}
                    // onClick={this.openMenu}
                    onClick={() => this.props.history.push("/change-password")}
                  >
                    <Image src={lock} preview={false} width={20} />
                    <div style={title}>{header2Const.changePwd}</div>
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
                    <div style={title}>{header2Const.logout}</div>
                  </div>
                </div>
              }
              trigger="click"
              placement="bottomRight"
            >
           <i className={"fas fa-user"}></i>
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
