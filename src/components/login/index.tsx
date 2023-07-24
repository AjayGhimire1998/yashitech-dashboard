import * as React from "react";
import { Container, Logo, Message, Wrapper } from "../../styles/global";
import { Input, InputDiv } from "./styles";
import { Button } from "../../styles/global";
import { login } from "../../services/auth-services/auth-service";
import Spinner from "../helper/Spinner";

interface LoginData {
  isAuthenticated?: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}

const Login: React.FC<LoginData> = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleLogin = async (): Promise<void> => {
    const { email, password } = loginData;
    if (email === "" || password === "") {
      setError("Email or password cannot be empty.");
      return;
    }
    try {
      setIsLoading(true);
      let res = await login(email, password);
      console.log(res);
      if (!res.error) {
        setIsAuthenticated(true);
      } else {
        setError(res.error);
      }
      setIsLoading(false);
    } catch (error) {
      // setIsLoading(true);
      // console.log("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo />
      <Wrapper>
        <InputDiv className="email-wrapper">
          <Input
            inputType="email"
            placeholder="Enter Super Admin Email"
            className="email-input"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
          />
        </InputDiv>
        <InputDiv className="password-wrapper">
          <Input
            inputType="password"
            placeholder="Enter Super Admin Password"
            className="password-input"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </InputDiv>

        <InputDiv className="login-submit-wrapper">
          {error ? <Message txtColor="red">{error}</Message> : null}
          {isLoading ? (
            <Spinner color="white" height="40" width="40" />
          ) : (
            <Button
              className="login-button"
              onClick={handleLogin}
              children="Login"
            />
          )}
        </InputDiv>
      </Wrapper>
    </Container>
  );
};

export default Login;
