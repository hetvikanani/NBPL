import styled from "styled-components";
// import { size } from "App/device";

const TableStyle = styled.div`
  .ant-table-content table {
    .center {
      text-align: center;
    }
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td,
    .ant-table tfoot > tr > th,
    .ant-table tfoot > tr > td {
      padding: 8px 7px;
      vertical-align: top;
    }
    .ant-table-pagination-right {
      justify-content: center;
    }
    .ant-pagination-item-link {
      color: #616161;
    }
    .actionUI {
      display: flex;
      justify-content: center;
      color: black;
      z-index: 1000;
      .edite_box {
        margin: 0 7px;
      }
      .dash {
        transform: rotate(90deg);
        font-size: 20px;
      }
    }
    .statusUI {
      display: flex;
      justify-content: center;
      font-weight: 500;
      .green {
        color: #10c900;
      }
      .red {
        color: #ed3437;
      }
    }
  }
`;
export default TableStyle;
