import styled from "styled-components";
import { Theme } from "App/theme";

const PackAddEditStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    h2 {
      color: ${Theme.mainColor};
    }
    .formDiv {
      margin-top: 2em;
      padding: 1em;
      background-color: #ffff;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .field {
        padding: 1em;
        label {
          font-size: 16px;
        }
        .switchDiv {
          .text:first-child {
            margin-left: 0;
          }
        }
        .rdw-editor-wrapper {
          border: 2px solid #dadada;
          .rdw-editor-main {
            height: 10em;
          }
        }
      }
      .bottomDiv {
        padding: 1em;
        display: flex;
        justify-content: end;
        align-items: center;
        button:first-child {
          margin-right: 2em;
        }
        Button {
          height: 35px;
          line-height: 35px;
        }
      }
    }
  }
`;
export { PackAddEditStyle };
