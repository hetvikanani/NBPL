import styled from "styled-components";
import { Theme } from "App/theme";

const PackageListStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    .headDiv {
      display: flex;
      margin-bottom: 2em;
      h2 {
        color: ${Theme.mainColor};
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
      max-width: 20em;
      margin-left: auto;
      margin-bottom: 2em;
    }
  }
`;
export { PackageListStyle };
