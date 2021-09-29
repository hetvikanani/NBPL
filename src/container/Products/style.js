import styled from "styled-components";
import { Theme } from "App/theme";

const ProductStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .headDiv{
      display: flex;
      .addButton {
        margin-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        width: 1.5em;
        height: 1.5em;
        border-radius: 25px;
        background-color: ${Theme.mainColor};
        color: #ffff;
        font-size: 1.5em;
        line-height: 1.5em;
        stroke: white;
        stroke-width: 3em;
      }
    }
    .products_div {
      .ant-col {
        margin-top: 4rem;
        .main-card-div {
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          border-top-left-radius: 15px;
          border-bottom-right-radius: 15px;
          .ant-card-body {
            position: relative;
            padding: 1em;
            .head-box {
              cursor: pointer;
              padding: 10px 20px 4px;
              border-radius: 20px 0 20px;
              position: absolute;
              text-align: center;
              top: -20px;
              left: 20px;
              right: 20px;
              .img-div {
                max-width: 100px;
                max-height: 23px;
                object-fit: contain;
              }
            }
            .contant_div {
              margin-top: 1em;
              .heding_div {
                min-height: 7em;
                padding: 1em 0;
                h3 {
                  margin-bottom: 0em;
                }
              }
            }
            .pere_con_div {
              text-align: center;
              font-size: 14px;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
              line-height: 22px;
              color: #676767;
              font-weight: 400;
            }
            .actionDiv {
              display: flex;
              justify-content: center;

              .acLogDiv {
                height: 2em;
                width: 2em;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0.3em;
                :hover{
                  background-color: #e4e4e4;
                }
              }
            }
            .vizLogo {
              background-color: #ff944c;
            }
            .ipingLogo {
              background-color: #0062a2;
            }
            .actLogo {
              background-color: #9c33b1;
            }
            .eauctionLogo {
              background-color: #7177e9;
            }
            .evotLogo {
              background-color: #09447d;
            }
            .ezeoLogo {
              background-color: #6c5ce7;
            }
            a {
              color: ${Theme.mainColor};
              font-weight: 600;
            }
          }
        }
      }
    }
  }
`;
export { ProductStyle };
