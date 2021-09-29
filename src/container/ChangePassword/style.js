import styled from "styled-components";
import { bg } from "components/Images";
const ChangePWDStyle = styled.div`
  display: flex;
  .allDiv {
    position: relative;
    padding: 3em 1em 1em;
    :before {
      content: "";
      background-image: url(${bg});
      background-size: cover;
      height: 80vh;
      width: 100%;
      position: absolute;
      filter: blur(5px);
    }
    .form_div {
      background-color: #ffff;
      margin: 0 auto;
      max-width: 30em;
      border-radius: 5px;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
      padding: 2em 3em;
      position: relative;
      .field {
        margin-top: 1em;
      }
    }
  }
`;

export { ChangePWDStyle };
