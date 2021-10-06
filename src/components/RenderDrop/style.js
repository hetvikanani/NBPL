import styled from "styled-components";
import { Theme } from "App/theme";
const StyleComponent = styled.div`
  .ant-dropdown {
    max-width: 300px;
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      white-space: unset;
    }
    .actionBtn {
      color: ${Theme.mainColor};
      display: flex;
      align-items: center;
      margin-bottom: 7px;
      padding: 5px;
      font-weight: 700;
      .text {
        margin-left: 10px;
      }
      :hover {
        border-bottom: 1px solid ${Theme.mainColor};
      }
  }
`;
export { StyleComponent };
