import * as React from "react";
import { ContactAttributes } from "..";
import { Container, LoadingSpinner, Message } from "../../../../styles/global";
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const { id } = useParams<ContactParam>();

  const getContact = React.useCallback(async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const res = await showContactData(id);
      setContactData(res.data);
      setMessage(res.data.message);
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setMessage(
        error.response.data.error || "Somnething went wrong. Try again."
      );
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getContact(id);
  }, [getContact, id]);

  return (
    <Container>
      <StaticContent history={"contacts"} />
      <br />
      <br />
     
      {message ? (
        <Message
          bgColor="#440a70"
          txtColor="white"
          onClick={() => {
            setMessage("");
          }}
        >
          {message}
        </Message>
      ) : null}
       {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : null}

    </Container>
  );
};

export default ViewContact;
