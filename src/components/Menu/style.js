import styled from "styled-components";
import { Theme } from "App/theme";
// import { size } from "App/device";

const StyledComponent = styled.div`
  background-color: ${Theme.mainColor};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  height: 100vh;
  padding-top: 1.8em;
  .logo {
    padding-left: 0.8em;
  }
  .ant-menu {
    background-color: transparent;
    margin-top: 2px;
    transition: background 0.3s, padding 0.3s,
      width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    .ant-menu-item,
    .ant-menu-submenu-title {
      color: #fff;
      font-size: 16px;
      :active {
        background: ${Theme.baseColor};
      }
      .ant-image {
        margin-right: 1.5em;
      }
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      padding: 0 12px !important;
      .ant-menu-title-content {
        width: 9.5em;
      }
      &.ant-menu-item-active .ant-menu-title-content {
        color: ${Theme.mainColor};
      }
    }
    .ant-menu-sub.ant-menu-inline {
      color: #fff;
      background: ${Theme.mainColor};
    }
    .ant-menu-submenu-arrow {
      color: #fff !important;
    }
    .ant-menu-submenu {
      .ant-menu-item {
        margin-bottom: 0;
        padding-left: 38px !important;
      }
      .ant-menu-item-selected {
        font-weight: 500;
        color: ${Theme.mainColor};
      }
    }
    .active,
    .ant-menu-item-selected,
    .ant-menu-item-active {
      background-color: #fff;
      color: ${Theme.mainColor};
    }
    .ant-menu-item::after {
      border-right: 0;
    }
    &.ant-menu-inline-collapsed {
      width: 45px;
    }
  }
  .ant-menu-inline,
  .ant-menu-vertical,
  .ant-menu-vertical-left {
    border-right: 0;
  }
`;

export { StyledComponent };
