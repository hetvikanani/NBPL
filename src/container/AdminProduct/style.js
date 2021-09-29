import styled from "styled-components";
import { Theme } from "App/theme";

const AdminProStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    h2{
      color: ${Theme.mainColor};
    }
    .formDiv {
      h2 {
        font-size: 1.3em;
      }
      margin-top: 2em;
      padding: 1em;
      background-color: #ffff;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    }
  }
`;
export { AdminProStyle };
