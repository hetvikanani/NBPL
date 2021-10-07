import React, { Component } from "react";
import { Pagination } from "antd";
export default class PaginationUI extends Component {
  render() {
    const { onChange, current, total } = this.props;
    return (
      <Pagination defaultCurrent={current} total={total} onChange={onChange} />
    );
  }
}
