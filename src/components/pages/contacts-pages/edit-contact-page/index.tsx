import * as React from "react";
import { Container } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { useParams } from "react-router-dom";
import { ContactParam } from "../view-contact-page";
import { showContactData } from "../../../../services/other-services/contact-services";

interface EditContactPayload {
  name: string | undefined;
  email: string | undefined;
  budget: string | undefined;
  files: object[] | undefined;
  services: string[] | undefined;
  request_count: number | undefined;
}

const EditContact: React.FunctionComponent = () => {
  const { id } = useParams<ContactParam>();
  const [contactPayload, setContactPayload] =
    React.useState<EditContactPayload>({
      name: "",
      email: "",
      budget: "",
      request_count: 0,
      files: [],
      services: [],
    });

  const getContactData = React.useCallback(async (id: string | undefined) => {
    try {
      const res = await showContactData(id);
      console.log(res.data);
      const { name, email, budget, request_count, services, files_url } =
        res.data.contact.data.attributes;
      setContactPayload((prev) => ({
        ...prev,
        name: name,
        email: email,
        budget: budget,
        services: services,
        files: files_url,
        request_count: request_count
      }));
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  React.useEffect(() => {
    getContactData(id);
    console.log(contactPayload);
    
  }, [getContactData, id]);
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
