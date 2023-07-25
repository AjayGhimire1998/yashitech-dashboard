import * as React from "react";
import { Container, Logo } from "../../../styles/global";
import { Pagination, PaginationWrapper } from "../styles";

interface Props {}

const Custom404Page: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <Logo />
      <PaginationWrapper>
        <Pagination href="/"> {"<- Back"}</Pagination>
      </PaginationWrapper>
      <br/>
      <br/>
      <h1>404 Error</h1>
      <h1>Page Not Found</h1>
    </Container>
  );
};

export default Custom404Page;
