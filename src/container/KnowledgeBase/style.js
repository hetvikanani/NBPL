import styled from "styled-components";

const BlogStyle = styled.div`
display: flex;
  .allDiv {
    padding: 2em 1em 1em;    
    .mainCard {
      border-radius: 10px;
      box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
      margin-top: 10px;

      .parentCard {
        border-radius: 20px;
        border: 1px solid #e5e4e2;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.1);
        margin-bottom: 10px;
        overflow: hidden;

        :hover {
          box-shadow: 0 0 10px #868585 !important;
        }
        .imgAnimation:hover {
          transform: scale3d(1.1, 1.1, 1.1);
        }

        .iconDiv {
          display: flex;
          justify-content: flex-start;
          color: gray;

          .iconDate {
            padding-right: 10px;
          }
          .iconDate {
            padding-right: 10px;
            padding-left: 10px;
          }
        }
        .button {
          border: none;
          color: #16548b;
          font-weight: 500;
          background: #fff;
        }
      }
    }

    .videoCol {
      margin: 0 auto;

      .scroll-bar {
        height: 90vh;
        overflow-y: auto;
      }
    }

    .footerRow {
      margin-top: 2rem;

      .footerDiv {
        display: flex;
        justify-content: space-between;

        .hoverDiv {
          position: relative;

          .videoCard1 {
            .ant-card-body {
              padding: 0 !important;
            }

            overflow: hidden;
            box-shadow: 0 0 10px rgb(0 0 0 / 20%);
            border-radius: 10px;

            margin-bottom: 1rem;
            > div {
              img {
                border-radius: 20px 20px 0 0 !important;
              }
            }
          }

          :hover .overlay {
            opacity: 1;
          }
          .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: 0.5s ease;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 15px;

            .text {
              color: #fff;
              font-size: 20px;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              text-align: center;
            }
          }
        }
      }
    }
  }
`;

export { BlogStyle };
