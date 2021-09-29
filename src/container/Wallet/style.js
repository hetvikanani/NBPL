import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";
const WalletStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 3em 1em 1em;
    .ant-col {
      margin-bottom: 15px;
      .box {
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        border-radius: 15px 0 15px 0;
        border-bottom: 5px solid #ffff;
        min-height: 8em;
        padding: 10px;
        :hover {
          border-bottom: 5px solid #16548b;
        }
        .ant-card-body {
          padding: 0;
          margin: 0.5em 0;
          .name {
            color: ${Theme.mainColor};
            margin: 0 0 0 0;
          }
          .input-div {
            display: flex;
            margin-top: 10px;
            align-items: center;
            .mark {
              font-weight: 700;
              margin-left: auto;
              margin-bottom: 0;
            }
            .inputBox {
              height: 40px;
              input {
                height: 38px;
              }
              @media ${size["mobile-md-max"]} {
                .ant-input-suffix {
                  padding: 0 4px;
                }
              }
            }
            .btn-head {
              height: 40px;
              width: 12em;
              line-height: 40px;
              @media ${size["mobile-md-max"]} {
                width: 13em;
              }
            }
          }
        }
      }
    }
    .boxDiv {
      background: #ffff;
      margin-top: 3em;
      padding: 1em;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      .table-div {
        margin-top: 2em;
        overflow-x: auto;
        // .ant-table-tbody{
        //   tr:nth-child(odd){
        //     background-color: #e2e2e2;
        //   }
        // }
      }
      .last-para {
        font-weight: 600;
        margin-top: 16px;
      }
      .inputNum-div {
        margin: 25px 0 0 0;
        display: flex;
        @media ${size["tablet-sm-max"]} {
          display: block !important;
        }
        .inputDiv {
          display: flex;
          justify-content: center;
          align-items: center;
          @media ${size["tablet-sm-max"]}{
            justify-content: flex-start;
          }
          // .ant-input-number {
          //   // width: 52px;
          // }
          span {
            margin-right: 5px;
            font-weight: 600;
          }
          .entries {
            margin-left: 5px;
          }
        }
        .searchDiv {
          margin-left: auto;
          @media ${size["tablet-sm-max"]} {
            margin-left: 0;
            margin-top: 10px;
          }
        }        
      }
    }
  }
`;
export { WalletStyle };
