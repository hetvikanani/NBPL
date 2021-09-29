import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const StyleComponent = styled.div`
  position: fixed;
  z-index: 99;
  width: 100%;
  position: relative;
  .maindiv {
    height: 4em;
    background: ${Theme.mainColor};
    .head-container {
      display: flex;
      color: #fff;
      width: 100%;
      font-size: 24px;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      div {
        display: flex;
        i {
          padding: 0.3125rem;
          margin-right: 1rem;
          font-size: 1.25rem;
          line-height: inherit;
          :before {
            cursor: pointer;
          }
        }
      }
      div:last-child {
        margin-left: auto;
      }
    }
    label.stlbl {
      margin: 0.5em;
      color: #fff;
      @media ${size["tablet-max"]} {
        display: none;
      }
    }
    a .ant-image {
      display: none;
    }
    @media ${size["tablet-max"]} {
      height: 3.3em;
      background: ${Theme.mainColor};
    }
  }
  .menubtn {
    display: none;
    @media ${size["tablet-max"]} {
      display: block;
      padding: 5px 10px;
      color: #fff;
      font-size: 2em;
      .anticon {
        vertical-align: 0;
      }
    }
  }
  .ant-drawer {
    display: none;
    @media ${size["tablet-max"]} {
      display: block;
    }
    .ant-drawer-wrapper-body {
      background: linear-gradient(354.97deg, #ed3437 -4.39%, #f89c32 123.56%);
      .ant-drawer-header {
        background: transparent;
        border-bottom: 1px solid #f47934;
        .profilEditDiv {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.5em;
        }
        .profileIMG {
          text-align: center;
          h2 {
            color: #ffffff;
            font-size: 20px;
            margin-top: 10px;
            font-weight: 700;
          }
        }
      }
      .ant-drawer-body {
        overflow-x: hidden;
        padding: 0;
      }
    }
    .ant-menu {
      border-right: none;
      height: 50vh;
      background: transparent;
      color: #fff;
      margin-bottom: 1rem;
      .ant-menu-sub {
        background-color: #1f3d98;
      }
      .ant-image {
        margin-right: 1em;
      }
      .ant-menu-submenu-arrow::before,
      .ant-menu-submenu-arrow::after {
        background-color: #fff;
      }
      .active,
      .ant-menu-item-selected,
      .ant-menu-submenu-open,
      .ant-menu-item-active,
      .ant-menu-sub,
      :not(.ant-menu-horizontal) .ant-menu-item-selected,
      .ant-menu-item:active,
      .ant-menu-submenu-title:active {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.28);
        :after {
          border-right: none;
        }
      }
    }
  }
`;

export { StyleComponent };
