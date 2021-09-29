import styled from "styled-components";
// import { size } from "App/device";
import { Theme } from "App/theme";

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
      .edite_box {
        margin: 0 7px;
      }
      .dash {
        transform: rotate(90deg);
        font-size: 20px;
      }
      .ant-dropdown {
        .ant-dropdown-menu {
          box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
          border-radius: 7px;
          .ant-dropdown-menu-item {
            padding: 5px 15px;
            :hover {
              background-color: #ffff;
            }
            .actionBtn {
              color: ${Theme.mainColor};
              display: flex;
              border-bottom: 1px solid;
              align-items: center;
              margin-bottom: 7px;
              padding: 5px;
              font-weight: 700;
              .text {
                margin-left: 10px;
              }
              :hover {
                background-color: #e4e4e4;
                border-bottom: none;
                border-radius: 5px;
              }
            }
          }
        }
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
