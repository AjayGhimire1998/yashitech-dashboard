import * as React from "react";
import { Container, LoadingSpinner, Message } from "../../../styles/global";
import StaticContent from "../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { ShowcaseColumn, ShowcasesWrapper } from "../showcases-pages/styles";
import { checkIfEven } from "../../../services/other-services/showcases-services";
import {
  deleteContact,
  getContactsData,
} from "../../../services/other-services/contact-services";
import { FooterContent } from "../pages-styles";

interface ContactsResponse {
  message: string;
  contacts: {
    data: [ContactAttributes];
  };
}

export interface ContactAttributes {
  id: string;
  type: string;
  attributes: {
    name: string;
    email: string;
    budget: string;
    file_urls: any;
    services: string[];
  };
}

const ContactsPage: React.FunctionComponent = () => {
  const [contacts, setContacts] = React.useState<ContactsResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<string>("");
  const [deleteMessage, setDeleteMessage] = React.useState<string>("");

  const getContacts = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getContactsData();
      setContacts(res.data);
      setMessage(res.data.message);
      setIsLoading(false);

      // console.log(contacts);
    } catch (error: any) {
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    getContacts();
  }, [getContacts]);

  const deleteShowCase = async (id: string) => {
    try {
      setIsDeleteLoading(id);
      alert(`Do you really want to delete contact ${id}`);
      const res = await deleteContact(id);
      setDeleteMessage(res.data.message);
      console.log(res.data);
      setIsDeleteLoading("");
      await getContacts();
    } catch (error: any) {
      setIsDeleteLoading("");
      setDeleteMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
      console.log(error);
    }
  };

  return (
    <Container>
      <StaticContent history="" />
      <br />
      <h2>Contacts Data</h2>
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
      <br />
      {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : contacts ? (
        <>
          {deleteMessage ? (
            <Message
              bgColor="#440a70"
              txtColor="white"
              onClick={() => {
                setDeleteMessage("");
              }}
            >
              {deleteMessage}
            </Message>
          ) : null}
          <br />
          <ShowcasesWrapper
            value1="Id"
            value2="Name"
            value3="Email"
            value4="Budget"
          >
            {contacts.contacts.data.map(
              (dt: ContactAttributes, index: number) => {
                return (
                  <ShowcaseColumn
                    key={dt.id}
                    value1={dt.id}
                    value2={dt.attributes.name}
                    value3={dt.attributes.email}
                    value4={dt.attributes.budget}
                    id={dt.id}
                    href1={`contacts/${dt.id}`}
                    href2={`contacts/${dt.id}/edit`}
                    isDeleting={isDeleteLoading === dt.id}
                    bgColor={checkIfEven(index + 1) ? "#e1dfdf" : "white"}
                    onClick={() => {
                      deleteShowCase(dt.id);
                    }}
                  />
                );
              }
            )}
          </ShowcasesWrapper>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
      <br />
      <br />
      <FooterContent />
    </Container>
  );
};

export default ContactsPage;
