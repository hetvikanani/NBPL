import styled from "styled-components";
import { size } from "../../App/device";
import { Theme } from "../../App/theme";

const ProfileStyle = styled.div`
display: flex;
.allDiv{
  padding: 3em 1em 1em;
  .optionui {
    border-radius: 4px;
    margin: 5px;
    color: #fff;
    background-color: ${Theme.mainColor};
    padding: 2px 5px;
    width: fit-content;
    @media ${size["laptop-max"]} {
      display: block;
    }
    .anticon {
      margin-left: 5px;
    }
  }
 
}
`;

export { ProfileStyle };
