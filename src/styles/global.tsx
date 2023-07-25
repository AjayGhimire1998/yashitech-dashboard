import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import SubmitButton from "../components/helper/global-helpers/SubmitButton";
import Response from "../components/helper/global-helpers/Response";
import CompanyLogo from "../components/helper/global-helpers/CompanyLogo";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: Century Gothic; 
   }
   #root{
       margin:0 auto;
   }

`;

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

export const Button = styled(SubmitButton)`
  outline: none;
  border-radius: ${(props) => (props.radius ? props.radius : "10px")};
  border: ${(props) => (props.border ? props.border : "0px solid transparent")};
  padding: 5px 10px;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.txtColor ? props.txtColor : "black")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};

  &:hover {
    background-color: ${(props) => (props.hoverBg ? props.hoverBg : "green")};
    color: ${(props) => (props.hoverColor ? props.hoverColor : "white")};
  }
`;

export const Message = styled(Response)`
background-color: ${(props) => (props.bgColor? props.bgColor : "white")};
  color: ${(props) => (props.txtColor ? props.txtColor : "white")};
  padding: 10px;
  /* width: 350px;
  @media (max-width: 600px) {
    width: 100%;
  } */
`;
