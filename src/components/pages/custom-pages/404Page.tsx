import * as React from "react";
import { Container, Logo, Wrapper } from "../../../styles/global";

interface Props {}

const Custom404Page: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Logo />
      <h1>404 Error</h1>
      <h1>Page Not Found</h1>
    </Container>
  );
};

export default Custom404Page;
