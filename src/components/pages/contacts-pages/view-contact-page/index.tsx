import * as React from "react";
import { ContactAttributes } from "..";
import { Container, LoadingSpinner, Message } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import {
  deleteContact,
  showContactData,
} from "../../../../services/other-services/contact-services";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShowcaseData,
  ShowcaseWrapper,
} from "../../showcases-pages/view-each-showcase-page/styles";
import { arrayOFAttributes } from "../../../../services/other-services/showcases-services";
import { ShowcaseColumn } from "../../showcases-pages/styles";

interface ContactData {
  message: string;
  error?: string;
  contact: {
    data: ContactAttributes;
  };
}

type ContactStringAttributes = {
  name: string;
  email: string;
  budget: string;
};

export type ContactParam = {
  id: string | undefined;
};

const ViewContact: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = React.useState<ContactData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>();
  const { id } = useParams<ContactParam>();
  const stringAttributes = ["name", "email", "budget", "request_count"];

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

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const res = await deleteContact(id);
      if (res.status === 200) {
        setMessage(res.data.message);
        setInterval(() => {
          setIsDeleteLoading(false);
          navigate("/contacts");
        }, 1000);
      }
    } catch (error: any) {
      setIsDeleteLoading(false);
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
    }
  };

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
      ) : contactData ? (
        <>
          <ShowcaseWrapper>
            {arrayOFAttributes(contactData.contact.data.attributes).map(
              (attr, index) => {
                if (stringAttributes.includes(attr))
                  return (
                    <ShowcaseData
                      key={index}
                      attribute={attr}
                      value={
                        contactData?.contact.data.attributes[
                          attr as keyof ContactStringAttributes
                        ] || "Null"
                      }
                    />
                  );
                return null;
              }
            )}
            <ShowcaseData
              key={1}
              attribute="services"
              value={contactData.contact.data.attributes.services.map(
                (service: any) => service.name
              )}
            />
            {contactData.contact.data.attributes.file_urls ? (
              contactData.contact.data.attributes.file_urls.map(
                (file: any, index: number) => {
                  return (
                    <ShowcaseData
                      key={index}
                      attribute={`files[${index}]`}
                      value={file}
                    />
                  );
                }
              )
            ) : (
              <ShowcaseData
                key={2}
                attribute={`files`}
                value="No files present for this contact."
              />
            )}

            <br />
            <ShowcaseColumn
              value2=""
              value3=""
              value4=""
              id={id}
              bgColor="white"
              href2={`${id}/edit`}
              isDeleting={isDeleteLoading}
              onClick={handleDelete}
            />
          </ShowcaseWrapper>
        </>
      ) : (
        <p>Something went wrong. Try Again.</p>
      )}
    </Container>
  );
};

export default ViewContact;
