import * as React from "react";
import {
  Button,
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
import {
  CatWrapper,
  PicInputWrapper,
} from "../../showcases-pages/create-new-showcase-page/styles";

interface EditContactPayload {
  name: string | undefined;
  email: string | undefined;
  budget: string | undefined;
  files: (File | FileList)[];
  service_ids: string[];
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

type ReturnedFiles = {
  id: number;
  filename: string;
  content_type: string;
  view_url: string;
  download_url: string;
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
      service_ids: [],
    });
  const [savedServices, setSavedServices] = React.useState<SavedServices[]>();
  const [returnedFiles, setReturnedFiles] = React.useState<ReturnedFiles[]>();

  const getContactData = React.useCallback(async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const res = await showContactData(id);
      console.log(res.data);
      const { name, email, budget, request_count, services, file_urls } =
        res.data.contact.data.attributes;
      setContactPayload((prev) => ({
        ...prev,
        name: name !== null ? name : "",
        email: email !== null ? email : "",
        budget: budget !== null ? budget : "",
        request_count: request_count,
      }));
      setSavedServices(services);
      setReturnedFiles(file_urls);
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

  //handling checkbox clicks
  const handleCheckboxInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setContactPayload((prev) => ({
        ...prev,
        service_ids: [...prev.service_ids, which],
      }));
    } else {
      setContactPayload((prev) => ({
        ...prev,
        service_ids: prev.service_ids.filter((ser) => ser !== which),
      }));
    }
  };

  //handling fileinput
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(files);

    if (files)
      setContactPayload((prev) => ({
        ...prev,
        files: [...prev.files, files[0]],
      }));
  };

  const handleCancel = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log(e);
    const { id } = e.currentTarget;
    if (id) {
      const updatedPayload = contactPayload.files.filter(
        (file: any) => file.name !== id
      );
      setContactPayload((prev) => ({
        ...prev,
        files: updatedPayload,
      }));
    }
  };

  const handleSubmit = () => {

  }

  React.useEffect(() => {
    console.log(contactPayload);
    console.log(services);
    console.log(returnedFiles);
  }, [contactPayload, services, returnedFiles]);

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
      ) : contactPayload && services ? (
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
              <label htmlFor="request_count" style={{ fontSize: "20px" }}>
                Request Count (between 1 and 5):&nbsp;&nbsp;
              </label>

              <input
                type="number"
                id="request_count"
                name="quantity"
                min="1"
                max="5"
                value={contactPayload.request_count}
                style={{ width: "40px" }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
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
              <label htmlFor="services_input" style={{ fontSize: "20px" }}>
                Services:
              </label>
              <small>
                Currently Present:{" "}
                {savedServices
                  ? savedServices.map((service) => service.name + ", ")
                  : null}{" "}
              </small>
              <br />
              {services.map((service: Services, index: number) => {
                return (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name={service.attributes.name}
                      onChange={(e) => handleCheckboxInput(e, service.id)}
                    />
                    {service.attributes.name}
                  </label>
                );
              })}
              {contactPayload.service_ids.length === 0 ? (
                <small style={{ color: "red" }}>
                  Please select at least one service
                </small>
              ) : null}
              <br />
              <small>
                Changing to:{" "}
                {contactPayload.service_ids
                  ? services.map((service) => {
                      if (contactPayload.service_ids.includes(service.id)) {
                        return service.attributes.name + ", ";
                      }
                    })
                  : null}{" "}
              </small>
              <br />
              <br />
              <PicInputWrapper>
                <label htmlFor="input_input" style={{ fontSize: "20px" }}>
                  Files:
                </label>
                <small>
                  Currently present:
                  {returnedFiles?.map((file) => {
                    return (
                      <div key={file.id}>
                        <a href={file.view_url} target="_blank">
                          {file.filename}
                        </a>
                        &emsp;&emsp;
                        <a href={file.download_url}>Download</a>
                      </div>
                    );
                  })}
                </small>
                <br />
                <input
                  type="file"
                  onChange={(e) => handleFileInputChange(e)}
                  multiple
                />
                <br />
                <small>
                  Changing to:
                  {contactPayload.files.map((file: any, index: number) => {
                    return (
                      <p key={index}>
                        {index + 1}: &nbsp; {file.name || "file"}&emsp;&emsp;
                        <span
                          style={{ textDecoration: "underline", color: "blue" }}
                          id={file.name}
                          onClick={(e) => handleCancel(e)}
                        >
                          Cancel
                        </span>
                      </p>
                    );
                  })}
                </small>
              </PicInputWrapper>
            </CatWrapper>
          </ShowcaseWrapper>
          <br />
          <div>
            <Button
              onClick={handleSubmit}
              bgColor="#440a70"
              txtColor="white"
              children="Submit"
            />
          </div>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
    </Container>
  );
};

export default EditContact;
