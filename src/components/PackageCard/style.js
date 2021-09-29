import styled from "styled-components";
import { Theme } from "App/theme";
const PackageStyle = styled.div`
  .cardDiv {
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    padding: 1em;
    border-radius: 8px;
    :hover{
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.4);
    }
    .headingDiv {
      text-align: center;
      margin-top: 0.5em;
      h2 {
        font-weight: bold;
        color: ${Theme.mainColor};
      }
    }
    .priceDiv {
      margin-top: 1.5em;
      height: 3.5em;
      border-radius: 10px;
      background: radial-gradient(
        circle,
        rgba(67, 137, 195, 1) 0%,
        rgba(22, 84, 139, 1) 79%
      );
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      .fas {
        font-size: 1.5em;
        margin-right: 8px;
      }
      h1 {
        margin-bottom: 0;
        font-weight: bold;
        font-size: 1.7em;
        sub {
          bottom: 0;
          font-size: 50%;
          font-weight: 500;
        }
      }
    }
    .listDiv {
      margin-top: 1em;
      min-height: 12em;
      .list {
        margin-top: 0.5em;
        .fas {
          color: ${Theme.mainColor};
          font-size: 8px;
          margin-right: 8px;
        }
      }
    }
    button {
      margin: auto;      
      padding: 0 25px;
      height: 30px;
      line-height: 30px;
    }
  }
`;
export { PackageStyle };
