import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const UserListStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    .headDiv {
      display: flex;
      margin-bottom: 2em;     
      h2 {
        margin-bottom: 0;
      }
      .addButton {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
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
    .searchDiv {
      margin-left: auto;
      max-width: 20em;
      margin-bottom: 2em;
    }
    
  }
`;
export { UserListStyle };
