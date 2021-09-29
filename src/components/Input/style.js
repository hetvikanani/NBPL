import styled from "styled-components";
import { size } from "App/device";
import { Theme } from "App/theme";

const FormWrapper = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  .ant-input-affix-wrapper {
    // border: 0;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    input {
      box-shadow: none;
    }
  }
  .ant-input-prefix {
    margin-right: 5px;
  }
  .ant-input-suffix {
    padding: 0 8px;
    color: ${Theme.mainColor};
  }
  input {
    display: block;
    width: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-appearance: none;
    background: #fff;
    border: 0;
    height: 34px;
    font-size: 15px;
    font-weight: 400;
    padding: 0 10px;
    border-radius: 5px;
    ::placeholder {
      color: #b5b5b5;
    }
    :-ms-input-placeholder {
      color: #b5b5b5;
    }
    ::-ms-input-placeholder {
      color: #b5b5b5;
    }
    :hover,
    :focus {
      outline: none;
    }
    @media ${size["desktop-sm-max"]} {
      font-size: 14px;
      padding: 5px 10px;
    }
  }
  .ant-input,
  .ant-input-password {
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0;
    color: #b5b5b5;
  }
  .ant-input-password {
    input {
      box-shadow: none !important;
      border-radius: 5px 0 0 5px !important;
    }
    .ant-input-suffix {
      border-radius: 0 5px 5px 0;
    }
  }
  .empty {
    border: 1px solid #e81c1c;
    box-shadow: 0 0 10px red !important;
  }
  .empty-field{
    border: 1px solid #e81c1c;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .ant-input-affix-wrapper > input.ant-input {
    padding: 0 10px;
  }
  // .txtError {
  //   border-color: rgb(216 26 26) !important;
  // }
  // .ant-input-suffix {
  //   padding: 0 0;
  //   color: #18558A;
  // }
`;

export { FormWrapper };
