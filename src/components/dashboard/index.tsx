import * as React from "react";
import { Container, Logo } from "../../styles/global";
import { Link, LinkWrapper } from "./styles";

const Dashboard: React.FunctionComponent = () => {
  return (
    <Container>
      <Logo />
      <LinkWrapper>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
      </LinkWrapper>
    </Container>
  );
};

export default Dashboard;
