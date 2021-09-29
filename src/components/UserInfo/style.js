import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const UserInfoStyle = styled.div`
.field {
    margin-top: 1em;
    label {
      font-size: 16px;
    }
  }
  .btnDiv{
    Button{
        width: 8em;
        height: 35px;
        line-height: 35px;
    }
  }
`;
export { UserInfoStyle };
