import { styled } from "styled-components";
import ContentWrapper from "../helper/pages-helpers/ContentWrapper";
import Attribute from "./home-page/Attribute";
import Data from "./home-page/Data";
import TextArea from "../helper/pages-helpers/TextArea";

export const ContentWrap = styled(ContentWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
`;
export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-self: flex-start;
  padding-left: 32px;
  padding-right: 32px;
`;
export const Pagination = styled.a`
  text-decoration: none;
  color: #440a70;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const AttributeKey = styled(Attribute)`
  font-weight: 800;
  font-size: 25px;
`;

export const DataValue = styled(Data)`
  font-size: 23px;
`;

export const FormTextArea = styled(TextArea)`
  /* border: none; */
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  font-size: 23px;
`;
