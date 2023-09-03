import * as React from "react";
import { ContactAttributes } from "..";
import { Container } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { showContactData } from "../../../../services/other-services/contact-services";
import { useParams } from "react-router-dom";

interface ContactData {
  message: string;
  error?: string;
  contact: {
    data: ContactAttributes;
  };
}

type ContactParam = {
  id: string | undefined;
};

const ViewContact: React.FunctionComponent = () => {
  const [contactData, setContactData] = React.useState<ContactData>();
  const { id } = useParams<ContactParam>();

  const getContact = React.useCallback(async (id: string | undefined) => {
    try {
      const res = await showContactData(id);
      setContactData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    getContact(id);
  }, [getContact, id])

  return (
    <Container>
      <StaticContent history={"contacts"} />
      <br />
      <br />
    </Container>
  );
};

export default ViewContact;
