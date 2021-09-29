import React, { Component } from "react";
import { Menu, Dropdown } from "antd";
import { StyleComponent } from "./style";

class RenderDrop extends Component {
  menu = () => {
    return (
      <Menu>
        <Menu.Item key="0">{this.props.children}</Menu.Item>
      </Menu>
    );
  };
  render() {
    const { item, id } = this.props;
    let cls = id ? "render-form" + id : "render-form";
    return (
      <StyleComponent>
        <div id={cls}>
          <Dropdown
            placement="bottomRight"
            overlay={this.menu()}
            trigger={["click"]}
            getPopupContainer={() => document.getElementById(cls)}
          >
            {item}
          </Dropdown>
        </div>
      </StyleComponent>
    );
  }
}

export default RenderDrop;
