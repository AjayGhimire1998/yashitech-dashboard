import * as React from "react";
import { Container, Logo } from "../../../styles/global";

interface Props {}

const Custom401Page: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Logo />
      <h1>401 Error</h1>
      <h1>Not Authorized</h1>
    </Container>
  );
};

export default Custom401Page;
