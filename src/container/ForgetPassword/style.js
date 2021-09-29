import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const StyleContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background: ${Theme.mainColor};
  position: relative;
  overflow: hidden;
  .canvasDiv {
    position: absolute;
  }
  .logoDiv {
    padding-top: 20px;
    text-align: center;
  }
  .form-div {
    border-radius: 10px;
    margin: auto;
    margin-top: 9%;
    background-color: #fff;
    min-width: 220px;
    background: #fff;
    width: 90%;
    max-width: 450px;
    position: relative;
    box-shadow: 0 30px 60px 0 rgb(0, 0, 0,.3);
    @media ${size["tablet-max"]} {
      margin-top: 15%;
    }
    .loginDiv {
      padding: 5%;
      .forgetlbl {
        font-size: 15px;
        line-height: 2em;
        color: ${Theme.mainColor};
      }
    }
  }
`;
const ResetContainer = styled.div`
  display: flex;
  .form-div {
    @media ${size["mobile-md-max"]} {
      margin-left: 10% !important;
      width: 70% !important;
    }
    @media (max-width: 350px) {
      margin-left: 5% !important;
    }
  }
`;
export { StyleContainer, ResetContainer };
