import * as React from "react";
import { Container } from "../../../styles/global";
import StaticContent from "../../helper/pages-helpers/global-pages-helpers/StaticContent";

interface IContactsProps {}

const ContactsPage: React.FunctionComponent<IContactsProps> = (props) => {
  return <Container>
    <StaticContent history="" />
      <br />
      <h2>Contacts Data</h2>
      <br />
      <br />
  </Container>;
};

export default ContactsPage;
