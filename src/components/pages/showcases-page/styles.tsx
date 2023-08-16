import { styled } from "styled-components";
import Column from "../../helper/pages-helpers/showcasepage-helpers/Column";
import ColumnWrapper from "../../helper/pages-helpers/showcasepage-helpers/ColumnWrapper";

export const ShowcasesWrapper = styled(ColumnWrapper)`
  @media (max-width: 900px) {
    width: 100%;
  }
`;
export const ShowcaseColumn = styled(Column)`
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  align-items: center;
  color: ${(props) => (props.id ? "black" : "white")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#440a70")};
  * {
    margin-left: 10px;
    width: 200px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 600px) {
      /* width: 100%; */
      height: 100%;
    }
  }
  :nth-child(1) {
    width: 50px;
   
  }
  :nth-child(2) {
    width: 250px !important;
    @media (max-width: 600px) {
      width: 100%;
      /* height: 100%; */
    }
  }
  :nth-child(5) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    button {
      cursor: pointer;
      display: flex;
      justify-content: space-evenly;
      color: white;
      background-color: red;
      &:hover {
        background-color: #e86666;
      }
    }
  }
`;
