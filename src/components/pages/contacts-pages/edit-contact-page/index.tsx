import * as React from "react";
import { Container } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { useParams } from "react-router-dom";
import { ContactParam } from "../view-contact-page";

interface IEditContactProps {}

const EditContact: React.FunctionComponent<IEditContactProps> = () => {
  const { id } = useParams<ContactParam>();

  return (
    <Container>
      <StaticContent history="contacts" />
      <br />
      <div>
        <h4>Editing Showcase with id {id}</h4>
      </div>
      <br />
      <br />
    </Container>
  );
};

export default EditContact;
