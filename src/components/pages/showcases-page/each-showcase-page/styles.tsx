import { styled } from "styled-components";

export const ShowcaseWrapper = styled.div`
    border: 2px solid black;
    width: 800px; 
    padding: 10px;

    @media (max-width: 800px) {
      width: 100%;
      height: 100%;
    }
`