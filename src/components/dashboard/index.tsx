import * as React from "react";
import { Button, Container, Logo } from "../../styles/global";
import { Link, LinkWrapper } from "./styles";
import { logOut } from "../../services/auth-services/auth-service";

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
      <br />
      <br />
      <Button
        bgColor="#440a70"
        txtColor="white"
        hoverBg="red"
        className="edit-button"
        children="LogOut"
        onClick={() => logOut()}
      />
      <br />
      <br />
    </Container>
  );
};

export default Dashboard;
