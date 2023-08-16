import styled from "styled-components";
import NavLink from "../../helper/dashboard-helpers/NavLink";
import NavLinksWrapper from "../../helper/dashboard-helpers/LinksWrapper"

export const Link = styled(NavLink)`
  text-decoration: none;
  border: 2px solid white;
  background-color: #440a70;
  padding: 80px;
  color: white;
  font-size: 30px;

  &:hover{
    border: 2px solid #440a70;
    opacity: 0.8;
  }
 
`;

export const LinkWrapper = styled(NavLinksWrapper)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  text-align: center;
  @media (max-width: 600px) {
    /* padding-left: 12px;
    padding-right: 12px;
    width: 100%; */
  }


`;
