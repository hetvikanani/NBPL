import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const AdmSelesStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 2em 1em 1em;
    h2 {
      color: ${Theme.mainColor};
    }
    .inputDiv {
      .buttonDiv {
        display: flex;
        align-items: flex-end;
        button {
          height: 35px;
          line-height: 35px;
          @media ${size["tablet-sm-max"]} {
            margin-top: 1em;
            margin-left: auto;
          }
        }
      }
    }
    .salesDiv {
      border: 2px solid rgba(0, 0, 0, 0.125);
      margin-top: 2em;
      .headerDiv {
        padding: 0.5em 1em;
        border-bottom: 2px solid rgba(0, 0, 0, 0.125);
        h2 {
          margin-bottom: 0;
        }
      }
      .tableDiv {
        padding: 1em;
        overflow-x: auto;
      }
    }
  }
`;
export { AdmSelesStyle };
