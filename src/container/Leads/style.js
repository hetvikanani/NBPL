import styled from "styled-components";
import { Theme } from "App/theme";

const LeadsStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .ant-card-bordered {
      margin-bottom: 1em;
      border: 1px solid rgba(0, 0, 0, 0.125);
      .ant-card-head {
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0 10px;
        background-color: #f8f9fa;
        .ant-card-head-title {
          padding: 5px 0;
          font-size: 1.5em;
          text-align: center;
          color: ${Theme.mainColor};
        }
        .ant-card-extra {
          padding: 5px 0;
          .addButton {
            border-radius: 25px;
            background-color: #16548b;
            color: #ffff;
            font-size: 1.5em;
            line-height: 1;
            padding: 4px;
            stroke: white;
            stroke-width: 3em;
          }
        }
      }
      .ant-card-body {
        padding: 1em;
        overflow-x: auto;
        .inputDiv {
          min-height: 26em;
          .field {
            margin-top: 1em;
          }
          .btn_div {
            margin-top: 2em;
            button {
              margin-left: auto;
              display: block;
            }
          }
          .demoBtndiv {
            margin-top: 8.7em;
            button {
              margin-left: auto;
              display: block;
            }
          }
        }
        .tableDiv {
          min-height: 25em;
          .search_div {
            margin-bottom: 1em;
          }
        }
      }
    }
  }
`;
export { LeadsStyle };
