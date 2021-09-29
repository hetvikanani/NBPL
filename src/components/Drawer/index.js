import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Avatar, Menu, Drawer } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";

import { StyleComponent } from "./style";
import { logo } from "components/Images";
import { MenuItems, CRMMenu, HelpMenu } from "components/Menu/constant";
import { configVar } from "modules/config";
import { getAuthRole } from "modules/helper";

var userRole = getAuthRole();
const { SubMenu } = Menu;
class DrawerUI extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      hidden: false,
      width: "86%",
    };
  }
  onOpenChange = (keys) => this.setState({ titlekey: keys[0] ? keys[0] : "" });
  setOpenKeys = (keys) => {
    try {
      const { history } = this.props;
      this.setState({ titlekey: keys.key });
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
      const { titlekey } = this.state;
      const { location } = this.props;
      let path = location.pathname.slice(1);
      let url = path.toLowerCase();
      url = url.replace("-", " ");
      let mi = MenuItems;
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
            <SubMenu key={i} title={a} icon={<UserOutlined />}>
              {menu.map((a) => (
                <Menu.Item key={a}>{a}</Menu.Item>
              ))}
            </SubMenu>
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  toggleMenu = (val) => this.setState({ hidden: !val });
  render() {
    const { hidden, width } = this.state;
    const { show, location } = this.props;
    let path = location.pathname.slice(1);
    let name = localStorage.auth ? JSON.parse(localStorage.auth).userName : "";
    let image = localStorage.auth ? JSON.parse(localStorage.auth).image : "";
    let url = configVar.BASE_URL.slice("/", -1);
    // style={{ width: width }}
    return (
      <StyleComponent className={!show ? "" : "show"}>
        <Drawer
          title={
            userRole === "ADMIN" ? (
              <NavLink to="/" className="flex mr-auto">
                <Image
                  alt="logo"
                  className="w-16"
                  width={200}
                  src={logo}
                  preview={false}
                />
              </NavLink>
            ) : (
              <>
                <div
                  className="profilEditDiv"
                  onClick={() => this.props.history.push("/profile")}
                >
                  {/* <Image src={profilEditImg} preview={false} width={25} /> */}
                </div>
                <div className="profileIMG">
                  <Avatar
                    src={!image ? <UserOutlined /> : url + image}
                    size={100}
                  />
                  <h2>{name}</h2>
                </div>
              </>
            )
          }
          placement={"left"}
          closable={false}
          onClose={() => this.toggleMenu(hidden)}
          visible={true}
          key={"left"}
          getContainer={() => document.getElementById("menu-form")}
        >
          <Menu
            title="menu"
            onClick={this.setOpenKeys}
            mode="inline"
            defaultSelectedKeys={path}
            onOpenChange={this.onOpenChange}
            openKeys={key}
          >
            {this.menuItem()}
          </Menu>
        </Drawer>
      </StyleComponent>
    );
  }
}
export default withRouter(DrawerUI);
