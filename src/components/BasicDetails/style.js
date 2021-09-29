import styled from "styled-components";
import { Theme } from "App/theme";

const BasicDetailsStyle = styled.div`
  margin-top: 3em;
  padding: 1em;
  background-color: #ffff;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);

  h2 {
    color: ${Theme.mainColor};
  }
  .formDiv {
    margin-top: 1em;
    .field {
      margin-top: 1em;
      label {
        font-size: 16px;
      }
      .text:first-child {
        margin-left: 0;
      }
      .ant-upload {
        font-size: 1.5em;
        padding-left: 1em;
        display: block;
        color: ${Theme.mainColor};
      }
    }
    .bottomDiv {
      display: flex;
      margin-top: 2em;
      .btn {
        margin-left: auto;
        button:first-child {
          margin-right: 2em;
        }
        button {
          height: 35px;
          line-height: 35px;
        }
      }
    }
    
  }
`;
export { BasicDetailsStyle };
