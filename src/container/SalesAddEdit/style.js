import styled from "styled-components";
import { Theme } from "App/theme";

const SelseAddEditStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .ant-card-bordered {
      border: 1px solid rgba(0, 0, 0, 0.125);
      .ant-card-head {
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        background-color: #f8f9fa;
        display: flex;
        padding: 0 15px;
        .ant-card-head-title {
          padding: 5px 0;
          font-size: 1.3em;
          color: ${Theme.mainColor};
        }
      }
    }
    .ant-card-body {
      padding: 0 15px 15px;
      .ant-col {
        min-height: 7em;
        .field {
          margin-top: 2em;
          .switchDiv {
            .text:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }
    .package_div {
      margin-top: 3em;
    }
    .licenceDiv {
      display: flex;
      margin-top: 2em;
      max-width: 22em;
      background-color: #f8f9fa;
      color: ${Theme.mainColor};
      padding: 0.5em 0;
      justify-content: center;
      align-items: center;
      p {
        margin-bottom: 0;
        font-weight: 400;
        font-size: 17px;
      }
      h2 {
        margin-bottom: 0;
        margin-left: 1em;
        font-weight: bold;
      }
      .icon {
        margin-left: 1em;
        border: 1px solid;
        width: 2.5em;
        height: 2em;
        background-color: #16548b;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
export { SelseAddEditStyle };
