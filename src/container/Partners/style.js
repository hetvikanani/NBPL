import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const PartnersStyle = styled.div`
  display: flex;
  .allDiv {
    padding: 1em;
    .headDiv {
      display: flex;
      margin-bottom: 2em;       
      h2 {
        margin-bottom: 0;
      }
      .addButton{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        width:1.5em; 
        height:1.5em; 
        border-radius: 25px;
        background-color: ${Theme.mainColor};
        color: #ffff;
        font-size: 1.5em;
        line-height: 1.5em;      
        stroke: white;
        stroke-width: 3em;
      }
      
    }
    .exportDiv{
      display: flex;
      margin-bottom: 2em;
      @media ${size["tablet-max"]}{
        display: block;
      }
      .expo{
        display: flex;
        align-items: center;
        margin-bottom: 1em;
        .exportAction{
          border-right: 2px solid #e4e4e4;
          padding: 5px 10px;
          font-weight: 700;
          color: ${Theme.mainColor};
            :hover {
              background-color: #e4e4e4;s
            }
        }
      }
      .searchDiv {
        margin-left: auto;
        max-width: 20em;    
      }
    }
    
  }
`;
export { PartnersStyle };
