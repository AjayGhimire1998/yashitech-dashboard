import * as React from "react";
import { Button, Container, Logo } from "../../../styles/global";
import { Link, LinkWrapper } from "./styles";
import {
  getUserDetails,
  logOut,
} from "../../../services/auth-services/auth-service";

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
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
        <Link linkTo="/homepage">Home Page Data</Link>
      </LinkWrapper>
      <br />
      <br />
      <p>logged in as: {getUserDetails().attributes.email}</p>
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
