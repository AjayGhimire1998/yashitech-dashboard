import * as React from "react";
import { Button, Container, Input, InputDiv, Logo, Wrapper } from "./styles";

const Login: React.FC = () => {
  return (
    <Container>
      <Logo />
      <Wrapper>
        <InputDiv className="email-wrapper">
          <Input inputType="email" placeholder="Enter Super Admin Email" />
        </InputDiv>
        <InputDiv className="password-wrapper">
          <Input
            inputType="password"
            placeholder="Enter Super Admin Password"
          />
        </InputDiv>
        <InputDiv className="login-submit">
          <Button className="login-button">Login</Button>
        </InputDiv>
      </Wrapper>
    </Container>
  );
};

export default Login;
