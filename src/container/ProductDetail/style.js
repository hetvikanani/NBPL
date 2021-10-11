import styled from "styled-components";
import { Theme } from "App/theme";
const ProDetailstyle = styled.div`
  height: 100vh;
  overflow-y: auto;
  background: #f8f9fa;
  display: flex;
  .allDiv {
    padding: 1em;
    .boxDiv {
      margin-top: 2%;
      padding: 1%;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
    }
    p {
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 22px;
      color: #676767;
    }
    .txtHead {
      margin-top: 6px;
    }
    .Feature-card {
      text-align: center;
      margin-top: 3em;
      border-radius: 5px;
      .img-div {
        // border: 1px solid ${Theme.mainColor};
        height: 3em;
        border-radius: 25px;
        width: 3em;
        display: flex;
        margin: auto;
        bottom: 4.7em;
        position: absolute;
        right: 20px;
        left: 20px;
        align-items: center;
        justify-content: center;
      }
      // .ant-image-img {
      //   display: block;
      //   margin: auto;
      //   height: auto;
      //   width: 67%;
      // }
      h4{
        padding-top: 10px;
      }
    }
    .box3 {
      .blue-head {
        font-weight: bold;
        color: #16548b;
      }
      .switch-div {
        display: flex;
        justify-content: center;
      }
      .Card-Div {
        margin-top: 3em;
      }
    }
    .box5 {
      .boxDiv {
        .pdfS{
          width: 10em;
          text-align: center;
          word-break: break-word;
          display: inline-block;
          .pdfIcon {
            text-align: center;
            display: inline-block;
            cursor: pointer;
            box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
            width: 1.5em;
            font-size: 50px;
            text-align: center;
            a{
              color:${Theme.mainColor};
            }
          }
        }
      }
    }
    .box6 {
      .react-multi-carousel-list {
        .react-multiple-carousel__arrow {
          min-width: 34px;
          min-height: 34px;
        }
        .react-multi-carousel-track {
          padding: 22px;
          margin: 5px;
        }
        .react-multi-carousel-dot button {
          display: inline-block;
          margin-right: 0;
          margin: 0 5px;
        }
        // .ant-image-img {
        //   width: 114%;
        // }
      }
    }
  }
`;
export { ProDetailstyle };
