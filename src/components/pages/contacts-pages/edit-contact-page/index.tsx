import * as React from "react";
import {
  Container,
  FormAttribute,
  LoadingSpinner,
  Message,
} from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { useParams } from "react-router-dom";
import { ContactParam } from "../view-contact-page";
import {
  getServices,
  showContactData,
} from "../../../../services/other-services/contact-services";
import { ShowcaseWrapper } from "../../showcases-pages/view-each-showcase-page/styles";
import { CatWrapper } from "../../showcases-pages/create-new-showcase-page/styles";

interface EditContactPayload {
  name: string | undefined;
  email: string | undefined;
  budget: string | undefined;
  files: object[] | undefined;
  services: string[] | undefined;
  request_count: number | undefined;
}

type LimitedAttributes = {
  name: string | undefined;
  email: string | undefined;
  budget: string | undefined;
};

type Services = {
  id: string;
  attributes: {
    name: string;
  };
};

type SavedServices = {
  id: string;
  name: string;
};

const EditContact: React.FunctionComponent = () => {
  const attributes: Array<string> = ["name", "email", "budget"];
  const { id } = useParams<ContactParam>();
  const [services, setServices] = React.useState<Services[]>();
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
  const [savedServices, setSavedServices] = React.useState<SavedServices[]>();

  const getContactData = React.useCallback(async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const res = await showContactData(id);
      console.log(res.data);
      const { name, email, budget, request_count, services, files_url } =
        res.data.contact.data.attributes;
      setContactPayload((prev) => ({
        ...prev,
        name: name !== null ? name : "",
        email: email !== null ? email : "",
        budget: budget !== null ? budget : "",
        services: services,
        files: files_url,
        request_count: request_count,
      }));
      setSavedServices(services);
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

  const getServicesData = async () => {
    try {
      const res = await getServices();
      setServices(res.data.services.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getContactData(id);
    getServicesData();
  }, [getContactData, id]);

  //inputchange
  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    which: string
  ): void => {
    const { value } = e.target;
    if (which === "name") {
      setContactPayload((prev) => ({
        ...prev,
        name: value,
      }));
    } else if (which === "email") {
      setContactPayload((prev) => ({
        ...prev,
        email: value,
      }));
    } else if (which === "budget") {
      setContactPayload((prev) => ({
        ...prev,
        budget: value,
      }));
    }
  };

  //request_count input
  const handleRequestCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContactPayload((prev) => ({
      ...prev,
      request_count: parseInt(e.target.value),
    }));
  };

  React.useEffect(() => {
    console.log(contactPayload);
    console.log(services);
  }, [contactPayload, services]);
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
          <ShowcaseWrapper>
            {attributes.map((attr: string, index: number) => {
              return (
                <FormAttribute
                  onChange={(e) => handleTextAreaChange(e, attr)}
                  key={index}
                  attribute={attr}
                  value={contactPayload[attr as keyof LimitedAttributes]}
                />
              );
            })}
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="request_count">
                Request Count (between 1 and 5):&nbsp;&nbsp;
              </label>

              <input
                type="number"
                id="request_count"
                name="quantity"
                min="1"
                max="5"
                style={{ width: "40px" }}
                onChange={(e) => handleRequestCountChange(e)}
              />
              {contactPayload.request_count ? (
                contactPayload.request_count < 0 ||
                contactPayload.request_count > 5 ? (
                  <small style={{ color: "red" }}>
                    Must be Between 1 and 5
                  </small>
                ) : null
              ) : null}
            </div>
            <br />
            <CatWrapper>
              <label htmlFor="services_input">Services:</label>
              <small>
                Currently Present:{" "}
                {savedServices
                  ? savedServices.map((service) => service.name + ", ")
                  : null}{" "}
              </small>
            </CatWrapper>
          </ShowcaseWrapper>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
    </Container>
  );
};

export default EditContact;
