import React, { Component } from "react";
import { Menu, Image } from "antd";
import { withRouter } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { StyledComponent } from "./style";
import { MenuItems, HelpMenu, CRMMenu, AdminItems } from "./constant";
import { logoWhite, nbpl } from "components/Images";
import { Theme } from "App/theme";

const { SubMenu } = Menu;

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titlekey: "",
      type: "",
      company: "",
      openKey: ["0"],
    };
  }
  componentDidMount() {
    try {
      let type = localStorage.auth && JSON.parse(localStorage.auth).role;
      type && this.setState({ type: type });
    } catch (error) {
      console.log(error);
    }
  }
  onOpenChange = (keys) => {
    const { openKey } = this.state;
    this.setState({ titlekey: keys[0] ? keys[0] : "" });
    const latestOpenKey = keys.find((key) => openKey.indexOf(key) === -1);
    if (["1", "4"].indexOf(latestOpenKey) === -1) {
      this.setState({ openKey: keys });
    } else this.setState({ openKey: latestOpenKey ? [latestOpenKey] : [] });
  };
  setOpenKeys = (keys) => {
    try {
      const { history } = this.props;
      this.setState({ titlekey: keys });
      let url = keys.key.toLowerCase();
      url = url.replace(" ", "-");
      url = url.replace("/", "-");
      history.push("/" + url);
    } catch (error) {
      console.log(error);
    }
  };
  menuItem = () => {
    try {
      let pathname = window.location.pathname;
      const { type, titlekey } = this.state;
      const { location } = this.props;
      let path = location.pathname.slice(1);
      let url = path.toLowerCase();
      url = url.replace("-", " ");
      let mi = [];
      if (type === "admin") mi = AdminItems;
      else mi = MenuItems;
      return mi.map((a, i) => {
        let cls =
          url === a.toLowerCase() || (url === "" && i === 0 && titlekey === "")
            ? "active"
            : "";
        if (a !== "CRM" && a !== "Help")
          return (
            <Menu.Item
              key={a}
              className={`anime ${cls}`}
              icon={i === 0 ? <HomeOutlined /> : <UserOutlined />}
            >
              {a}
            </Menu.Item>
          );
        else {
          let menu = a === "CRM" ? CRMMenu : HelpMenu;
          return (
            <SubMenu
              key={i}
              title={a}
              icon={<UserOutlined />}
              className="anime"
            >
              {menu.map((a) => (
                <Menu.Item key={a} className="anime">
                  {a}
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { location, collapsed } = this.props;
    const { openKey } = this.state;
    let path = location.pathname.slice(1);
    let key = [];
    let admin =
      localStorage.auth && JSON.parse(localStorage.auth).role === "admin";
    return (
      <StyledComponent
        style={{ backgroundColor: admin ? Theme.adColor : Theme.mainColor }}
      >
        <div className="logo">
          <Image
            width={collapsed ? 30 : 128}
            src={collapsed ? nbpl : logoWhite}
            preview={false}
            className="pointer"
            onClick={() => this.setOpenKeys({ key: "" })}
          />
        </div>
        <Menu
          title="menu"
          mode="inline"
          openKeys={openKey}
          defaultSelectedKeys={path}
          inlineCollapsed={collapsed}
          onClick={this.setOpenKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.menuItem()}
        </Menu>
      </StyledComponent>
    );
  }
}
const mapStateToProps = (state) => ({
  collapsed: state.app.collapsed,
});

export default withRouter(connect(mapStateToProps, null)(MenuComponent));
