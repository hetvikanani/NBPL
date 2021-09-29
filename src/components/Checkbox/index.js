import React, { Component } from "react";
import { Checkbox } from "antd";
import { StyleContainer } from "./style";

export default class Check extends Component {
  render() {
    const { text, onChange,checked } = this.props;
    return (
      <StyleContainer>
        <Checkbox onChange={onChange} checked={checked}>{text}</Checkbox>
      </StyleContainer>
    );
  }
}
