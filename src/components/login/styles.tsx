import styled from "styled-components";
import LoginIput from "../helper/login-helpers/LoginInput";
import LoginInputWrapper from "../helper/login-helpers/LoginInputWrapper";
import CompanyLogo from "../helper/CompanyLogo";
import SubmitButton from "../helper/SubmitButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    padding-left: 32px;
    padding-right: 32px;
    width: 100%;
  }
`;

export const Logo = styled(CompanyLogo)`
  width: 200px;
  margin: 50px;
  cursor: pointer;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  gap: 30px;
  width: 600px;
  border-radius: 10px;
  background-color: #440a70;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
export const InputDiv = styled(LoginInputWrapper)`
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.flexD ? props.flexD : "xc")};
  justify-content: ${(props) => (props.justifyC ? props.justifyC : "center")};
  align-items: ${(props) => (props.alignI ? props.alignI : "center")};
`;

export const Input = styled(LoginIput)`
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

export const Button = styled(SubmitButton)`
  outline: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: green;
    color: white;
  }
`;
