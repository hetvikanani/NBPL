import styled from "styled-components";
import { Theme } from "App/theme";
const StyledComponent = styled.div`
  width: 100%;
  .ant-picker {
    width: inherit;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    padding: 5px;
  }
  .ant-picker-suffix {
    color: ${Theme.mainColor};
  }
  .ant-picker-clear {
    background: ${Theme.baseColor};
  }
  .empty {
    border: 1px solid #e81c1c;
  }
  .ant-picker-content {
    height: 210px;
  }
`;

export { StyledComponent };
