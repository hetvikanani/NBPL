import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const UserRoleStyle = styled.div`
  
  .field {
    padding-top: 2em;
    display: flex;
    label {
      font-size: 16px;
      margin-right: 10px;
    }
    .ant-select {
      max-width: 18em;
    }
  }
  .btnDiv {
    margin-top: 3em;
    margin-right: 1em;
    Button {
      width: 8em;
      height: 35px;
      line-height: 35px;
    }
  }
  .tableDiv {
    margin-top: 2em;
    overflow-x: auto;
    table {
      width: 100%;
      border-collapse: collapse;
      thead tr {
        border-bottom: 1px solid #dddddd;
        border-top: 1px solid #dddddd;
      }
      td,
      th {
        // border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
      }
      .text {
        padding: 8px 8px 8px 20px;
        font-weight: 700;         
        width: 3em;
      }
    }
  }
`;
export { UserRoleStyle };
