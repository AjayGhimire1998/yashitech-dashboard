import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import SubmitButton from "../components/helper/global-helpers/SubmitButton";
import Response from "../components/helper/global-helpers/Response";
import CompanyLogo from "../components/helper/global-helpers/CompanyLogo";
import Spinner from "../components/helper/global-helpers/Spinner";
import Form from "../components/helper/global-helpers/Form";

export default createGlobalStyle`
   *{
       margin: 0;
       padding: 0;
       outline:0;
       box-sizing:border-box;
       font-family: Arial, Helvetica, sans-serif; 
   }
   #root{
       margin:0 auto;
      
   }
  

`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* width: 1350px; */
  /* position: relative; */
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
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  color: ${(props) => (props.txtColor ? props.txtColor : "white")};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  font-size: 15px;

  small {
    border: 1px solid white;
    padding: 3px;
    background-color: ${(props) => (props.xBgColor ? props.xBgColor : "red")};
    cursor: pointer;
    &:hover {
      border: 1px solid white;
      background-color: ${(props) =>
        props.xBgColor ? props.xBgColor : "white"};
      color: red;
    }
  }
`;

export const LoadingSpinner = styled(Spinner)`
  color: ${(props) => (props.color ? props.color : "#440a70")};
  width: ${(props) => (props.height ? props.height : "30px")};
  height: ${(props) => (props.width ? props.width : "30px")};
`;

export const ShowcaseForm = styled(Form)`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  /* @media (max-width: 600px) {
    width: 100%;
  } */
  div {

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      label{
        font-size: 20px;
      }
      textarea{
        font-size: 18px;
      }

      img{
        width: 150px;
      }


  }
`;
