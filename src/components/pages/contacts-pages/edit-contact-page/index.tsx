import * as React from "react";
import { Container, LoadingSpinner, Message } from "../../../../styles/global";
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
  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
      setIsLoading(true);
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
        request_count: request_count,
      }));
      setMessage(res.data.message);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
      setIsLoading(false);
    }
  }, []);
  React.useEffect(() => {
    getContactData(id);
  }, [getContactData, id]);
  return (
    <Container>
      <StaticContent history="contacts" />
      <br />
      <div>
        <h4>Editing Contact with id {id}</h4>
      </div>
      <br />
      <br />{" "}
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
      ) : contactPayload ? (
        <>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
    </Container>
  );
};

export default EditContact;
