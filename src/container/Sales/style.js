import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const SelesStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .ant-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
      .ant-col {
        @media ${size["tablet-md-max"]} {
          padding-top: 1.5em;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .box {
          box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
          border-top-left-radius: 15px;
          border-bottom-right-radius: 15px;
          border-bottom: 5px solid #ffff;
          :hover {
            border-bottom: 5px solid #16548b;
          }
          .ant-card-body {
            padding: 0;
            margin: 0.5em 0;
            display: flex;
            .ant-image {
              margin-left: auto;
              @media ${size["laptop-max"]} {
                width: 50px;
              }
              .topImg {
                padding: 5px;
              }
            }
            .content {
              margin: auto 0;
              .name {
                color: ${Theme.mainColor};
                margin: 0 0 0 10px;
              }
              .number {
                font-weight: 600;
                margin: 0 0 0 10px;
              }
            }
          }
        }
      }
    }
    .salesListDiv {
      border: 2px solid rgba(0, 0, 0, 0.125);
      margin-top: 4em;
      .headerDiv {
        display: flex;
        padding: 0.5em 1em;
        border-bottom: 2px solid rgba(0, 0, 0, 0.125);
        @media ${size["mobile-md-max"]} {
          display: block;
        }
        h2 {
          color: ${Theme.mainColor};
          margin-bottom: 0;
        }
        .adsDiv {
          margin-left: auto;
          display: flex;
          align-items: center;
          @media ${size["mobile-md-max"]} {
            margin-top: 10px;
          }
          .btn {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffff;
            width: 10em;
            height: 2em;
            background: ${Theme.mainColor};
            stroke: white;
            stroke-width: 3em;
            .anticon {
              margin-right: 5px;
            }
          }
        }
      }
      .tableDiv {
        padding: 1em;
        overflow-x: auto;
      }
    }
  }
`;
export { SelesStyle };
