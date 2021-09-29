import styled from "styled-components";
import { Theme } from "App/theme";
const Button = styled.button`
  background: ${(props) => props.bgcolor.background};
  color: ${(props) => props.bgcolor.color};
  cursor: pointer;
  border: 0;
  display: inline-block;
  font-family: Roboto;
  position: relative;
  padding: 0 20px;
  height: 40px;
  // border-radius: 2em;
  width: auto;
  line-height: 40px;
  font-size: 14px;
  min-width: 60px;
  letter-spacing: 0;
  text-transform: none;
  transition: all 0.4s ease;
  :hover,
  :focus {
    color: ${Theme.mainColor};
    background: #e2e2e2;
    outline: none;
  }
`;

export { Button };
