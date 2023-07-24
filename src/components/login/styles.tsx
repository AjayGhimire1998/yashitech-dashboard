import styled from "styled-components";
import LoginInput from "../helper/login-helpers/LoginInput";
import LoginInputWrapper from "../helper/login-helpers/LoginInputWrapper";



export const InputDiv = styled(LoginInputWrapper)`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.flexD ? props.flexD : "column")};
  justify-content: ${(props) => (props.justifyC ? props.justifyC : "center")};
  align-items: ${(props) => (props.alignI ? props.alignI : "center")};
  gap:20px;
`;

export const Input = styled(LoginInput)`
  outline: none;
  border: 2px solid #440a70;
  padding: 20px 10px;
  width: 350px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  &:focus {
    border: 2px solid green;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

