import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const DashbordStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .mainTxt {
      font-weight: 600;
      margin: 0 0 0 10px;
    }
    .top-row {
      margin-top: 1em;
      .box {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        margin-right: 10px;
        margin-bottom: 15px;
        border-bottom: 5px solid #ffff;
        :hover {
          border-bottom: 5px solid #16548b;
        }
        .ant-card-body {
          padding: 0;
          margin: 0.5em 0;
          display: flex;
          height: auto;
          .content {
            margin: auto 0;
            .name {
              color: ${Theme.mainColor};
              margin: 0 0 0 10px;
            }
          }
          .ant-image {
            margin-left: auto;
            @media ${size["laptop-max"]} {
              width: 50px;
            }
            .topImg {
              padding: 5px;
            }
          }
        }
      }
      .dateUI {
        display: flex;
        align-items: center;
      }
    }
    .middle-row {
      margin-top: 2em;
      .box {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        height: 20em;
        @media ${size["laptop-max"]} {
          margin-bottom: 2em;
        }
      }
      .slider_div {
        background-color: #ffff;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        .ant-image {
          width: 100%;
          .ant-image-img {
            height: 180px;
            object-fit: cover;
          }
        }
        .accountDiv {
          text-align: center;
          h2 {
            margin-top: 1em;
          }
          .detailDiv {
            margin-top: 1em;
            div {
              margin: 0.5em;
            }
          }
        }
      }
      .referral_div {
        margin-top: 1.5em;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        text-align: center;
        h2 {
          font-size: 18px;
        }
        .ref_Code {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.4em 0;
          @media ${size["mobile-md-max"]} {
            display: block;
          }
          .code {
            font-weight: bold;
            font-size: 20px;
            color: ${Theme.mainColor};
          }
          .icons {
            display: flex;
            justify-content: center;
            margin-left: 2em;
            @media ${size["mobile-md-max"]} {
              margin-left: 0;
              margin-top: 5px;
            }
            .icon {
              width: 2em;
              height: 1.5em;
              background-color: #16548b;
              + .icon {
                margin-left: 1em;
              }
            }
          }
        }
      }
    }
    .bottom_div {
      margin-top: 3em;
      padding: 1em 0.5em;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .ant-col {
        display: flex;
        margin-top: 2em;
        justify-content: center;
        .img_div {
          box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
          height: 2.5em;
          width: 11em;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1em;
        }
        .vizShadow:hover {
          box-shadow: 2px 3px 7px rgb(255 119 29);
        }
        .ezShadow:hover {
          box-shadow: 2px 3px 7px rgb(108 92 231);
        }
        .eVShadow:hover {
          box-shadow: 2px 3px 7px rgb(15 105 40);
        }
        .actShadow:hover {
          box-shadow: 2px 3px 7px rgb(168 54 180);
        }
        .eAuShadow:hover {
          box-shadow: 2px 3px 7px rgb(112 118 233);
        }
        .iPShadow:hover {
          box-shadow: 2px 3px 7px rgb(0 96 167);
        }
      }
    }
  }
`;
export { DashbordStyle };
