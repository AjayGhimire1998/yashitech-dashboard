import { styled } from "styled-components";
import ViewShowcase from "../../../helper/pages-helpers/showcasepage-helpers/ViewShowcase";

export const ShowcaseWrapper = styled.div`
  width: 700px;
  padding: 10px;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ShowcaseData = styled(ViewShowcase)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid black;
  width: 700px;
  min-height: 50px;
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }

  :nth-child(1) {
    width: 150px;
    /* display: flex; */
    /* justify-content: flex-start; */
  }
  :nth-child(2) {
    width: 550px;
    margin-left: 50px;
    overflow: hidden;
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start; */
    white-space: normal; /* Allow text to wrap */
    word-wrap: break-word; /* Break long words */
    /* height: 80px; */
    /* inline-size: 150px; */
    p {
    }
    img {
      width: 150px;
    }
  }
`;
