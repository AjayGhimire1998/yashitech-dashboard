import * as React from "react";
import {  Container, Logo } from "../../../styles/global";
import { Link, LinkWrapper } from "./styles";
import {
  getUserDetails,
} from "../../../services/auth-services/auth-service";

import { FooterContent } from "../pages-styles";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Container>
      <Logo />
      <h4 style={{ color: "#440a70" }}>Welcome {getUserDetails().attributes.first_name}</h4>
      <br />
      <br />
      <LinkWrapper>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/showcases">Showcase Data</Link>
      </LinkWrapper>
      <br/>
      <br/>
      <FooterContent />
    </Container>
  );
};

export default Dashboard;
