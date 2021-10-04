import styled from "styled-components";
import { Theme } from "App/theme";

const ProDocStyle = styled.div`
  .field {
    margin-top: 1em;
    label {
      font-size: 16px;
    }
  }
  .compLogoDiv {
    margin-top: 1em;
    text-align: center;
    label {
      font-size: 16px;
    }
    .ant-upload {
      font-size: 1.5em;
      display: block;
      color: ${Theme.mainColor};
      max-width: 10em;
      cursor: pointer;
      margin: auto;
    }
  }
  .addbtn {
    padding-top: 2em;
    display: flex;
    align-items: center;
    .addButton {
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5em;
      height: 1.5em;
      border-radius: 25px;
      background-color: ${Theme.mainColor};
      color: #ffff;
      font-size: 1.5em;
      line-height: 1.5em;
      stroke: white;
      stroke-width: 3em;
    }
  }
  .pdfSDiv {
    display: inline-block;
    margin-right: 2em;
    margin-top: 2em;
    // text-align: center;
    .anticon-file-pdf {
      svg {
        width: 2em;
        height: 2em;
      }
    }
    .anticon-delete {
      margin-left: 10px;
    }
  }
  .linkDiv {
    display: inline-block;
    margin-right: 2em;
    margin-top: 1em;
    padding: 1em 0;
    .videoBox {
      display: flex;
      .anticon-close {
        margin-left: 10px;
      }
    }
  }
  .btnDiv {
    margin-top: 2em;
    margin-bottom: 1em;
    Button {
      width: 8em;
      height: 35px;
      line-height: 35px;
    }
  }
`;
export { ProDocStyle };
