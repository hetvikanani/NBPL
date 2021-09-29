import styled from "styled-components";
import { Theme } from "App/theme";
import { size } from "App/device";

const ContDetailsStyle = styled.div`
  margin-top: 3em;
  padding: 1em;
  background-color: #ffff;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);

  h3 {
    color: ${Theme.mainColor};
  }
  .formDiv {
    margin-top: 1em;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    padding-bottom: 0.5em;
    .field {
      margin: 1em;
      label {
        font-size: 16px;
      }
    }
    .bottomDiv {
      margin: 1em;
      display: flex;
      @media ${size["mobile-md-max"]} {
        display: block;
      }
      .leftBtnDiv {
        button:first-child {
          margin-right: 1em;
        }
        @media ${size["mobile-md-max"]} {
          button:last-child {
            margin-top: 1em;
          }
        }
        
      }
      .rightBtnDiv{
        margin-left: auto;
        @media ${size["mobile-md-max"]} {
          margin-top: 1em;
          margin-left: 0;
        }
      }
      button {
        height: 35px;
        line-height: 35px;
      }
    }
  }
`;
export { ContDetailsStyle };
