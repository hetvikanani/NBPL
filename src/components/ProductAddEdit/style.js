import styled from "styled-components";
import { Theme } from "App/theme";

const ProAddEditStyle = styled.div`
  h2 {
    margin-top: 1em;
  }
  .field {
    margin-top: 1em;
    label {
      font-size: 16px;
    }
    .rdw-editor-wrapper {
      border: 2px solid #dadada;
      .rdw-editor-main {
        height: 10em;
        padding: 0 1em;
      }
    }
    .editorError {
      border: 1px solid #e81c1c;
      box-shadow: 0 0 10px red !important;
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
    .optionui{
      margin-right: 10px;
      .anticon {
        margin:0 5px;
      }
    }
    .imgcompanyLogo{
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
    }
    .imgicon{
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
    }
  }
  .addbtn {
    padding-top: 2em;
    display: flex;
    align-items: center;
    .addButton {
      margin-right: 2rem;
      margin-left: auto;
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
  .imagesDiv {
    .imgDiv {
      display: inline-block;
      padding: 0 2em;
      margin-top: 2em;
      text-align: center;
      .anticon {
        margin-left: 10px;
        cursor: pointer;
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
export { ProAddEditStyle };
