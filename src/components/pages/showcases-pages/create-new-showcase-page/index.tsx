import * as React from "react";
import { Container, Message, ShowcaseForm } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";
import { createNewShowcase } from "../../../../services/other-services/showcases-services";
import { useNavigate } from "react-router-dom";

type NewShowCasePayload = {
  showcase: {
    title: string;
    showcase_type: string;
    site_link: string;
    year: string;
    client: string;
    role: string;
    ask: string;
    solution: string;
    showcase_categories: string[];
    thumbnail: Blob | null;
    ss: Blob | null;
  };
};

type MessageType = {
  message?: string;
  error?: string;
  errors?: [];
};

const NewShowCasePage: React.FunctionComponent = () => {
  const attributes: Array<string> = [
    "title",
    "showcase_type",
    "site_link",
    "year",
    "client",
    "role",
    "ask",
    "solution",
  ];
  const checkboxValues: string[] = ["UI/UX", "Website", "Mobile App"];
  const navigate = useNavigate();

  //states
  const [thumbnail, setThumbnail] = React.useState<string>();
  const [ss, setSs] = React.useState<string>();
  const [payload, setPayload] = React.useState<NewShowCasePayload["showcase"]>({
    title: "",
    showcase_type: "",
    site_link: "",
    year: "",
    client: "",
    role: "",
    ask: "",
    solution: "",
    showcase_categories: [],
    thumbnail: null,
    ss: null,
  });
  const [message, setMessage] = React.useState<MessageType>({
    error: "",
    errors: [],
    message: "",
  });
  const [newId, setNewId] = React.useState<string>();

  //handle text are input
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
    console.log(payload);
  };

  //file input
  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ): void => {
    if (!e.target.files) return;
    if (which === "thumbnail") {
      const thumbnail_file = e.target.files[0];
      setThumbnail(URL.createObjectURL(thumbnail_file));
      if (thumbnail_file) {
        setPayload((prevPayload) => ({
          ...prevPayload,
          thumbnail: thumbnail_file,
        }));
      }
    } else if (which === "ss") {
      const ss_file = e.target.files[0];
      setSs(URL.createObjectURL(ss_file));
      if (ss_file) {
        setPayload((prevPayload) => ({
          ...prevPayload,
          ss: ss_file,
        }));
      }
    } else if (which === "clear") {
      e.target.files = null;
    }
  };

  //handling radio input
  const onCheckBoxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    const isChecked = e.target.checked;

    setPayload((prevPayload) => {
      if (isChecked)
        return {
          ...prevPayload,
          showcase_categories: [...prevPayload.showcase_categories, category],
        };
      else
        return {
          ...prevPayload,
          showcase_categories: prevPayload.showcase_categories.filter(
            (cat) => cat !== category
          ),
        };
    });
  };

  //resetting input
  const inputOneRef: any = React.useRef(null);
  const inputTwoRef: any = React.useRef(null);
  const cancelFileInput = (which: string): void => {
    if (which === "thumbnail") {
      if (inputOneRef.current) {
        inputOneRef.current.value = null;
        setThumbnail("");
      }
      setPayload((prevPayload) => ({
        ...prevPayload,
        thumbnail: null,
      }));
    } else if ("ss") {
      if (inputTwoRef.current) {
        inputTwoRef.current.value = null;
        setSs("");
      }
      setPayload((prevPayload) => ({
        ...prevPayload,
        ss: null,
      }));
    }
  };

  //handleSubmit
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("showcase[title]", payload.title);
    formDataToSend.append("showcase[showcase_type]", payload.showcase_type);
    formDataToSend.append("showcase[site_link]", payload.site_link);
    formDataToSend.append("showcase[year]", payload.year);
    formDataToSend.append("showcase[client]", payload.client);
    formDataToSend.append("showcase[ask]", payload.ask);
    formDataToSend.append("showcase[solution]", payload.solution);
    formDataToSend.append("showcase[role]", payload.role);
    payload.showcase_categories.forEach((category) => {
      formDataToSend.append("showcase[categories][]", category);
    });
    if (payload.thumbnail)
      formDataToSend.append("showcase[thumbnail]", payload.thumbnail);
    if (payload.ss) {
      formDataToSend.append("showcase[ss]", payload.ss);
    }

    try {
      const res = await createNewShowcase(formDataToSend);
      setMessage((prevMessage) => ({
        ...prevMessage,
        message: res.data.message,
      }));
      setNewId(res.data.showcase.data.id);
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
      let fullError: string = "";
      error.response.data.full_errors.forEach((err: string) => {
        fullError += `${err}.
        `;
      });
      console.log(fullError);

      setMessage((prevMessage) => ({
        ...prevMessage,
        error: fullError,
        errors: error.response.data.full_errors,
      }));
    }
  };

  //sideEffects

  React.useEffect(() => {
    const navInterval = setInterval(() => {
      if (newId) {
        navigate(`/showcases/${newId}`);
      }
    }, 2000);
    return () => {
      clearInterval(navInterval);
    };
  }, [newId]);

  return (
    <Container>
      <StaticContent history="showcases" />
      <br />
      <div>
        <h4>Create a New Showcase</h4>
      </div>
      <br />
      <br />
      {message.message || message.error ? (
        <Message
          bgColor="#440a70"
          txtColor="white"
          onClick={() => {
            setMessage({ message: "", error: "", errors: [] });
          }}
        >
          {message.message || message.error}
        </Message>
      ) : null}
      <br />
      <ShowcaseWrapper>
        <ShowcaseForm
          attributes={attributes}
          btnText="Create"
          requiredParam="showcase"
          onChange={handleTextAreaChange}
          onClick={handleSubmit}
        >
          <div>
            <label htmlFor="showcase_categories_input">
              Showcase_Categories:
            </label>

            {checkboxValues.map((checkbox, index) => {
              return (
                <div key={index}>
                  <label style={{ fontSize: "15px" }}>
                    <input
                      type="checkbox"
                      name={checkbox}
                      onChange={(e) => onCheckBoxClick(e, checkbox)}
                    />
                    {checkbox}
                  </label>
                </div>
              );
            })}
          </div>
          <div>
            <label htmlFor="thumbnail_input">Thumbnail</label>
            <input
              type="file"
              className="thumbnail_input"
              onChange={(e) => handleFileInput(e, "thumbnail")}
              ref={inputOneRef}
            ></input>
            {thumbnail && <img src={thumbnail} alt="thumbnail" />}
            {thumbnail && (
              <p
                style={{
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => cancelFileInput("thumbnail")}
              >
                Clear
              </p>
            )}
          </div>
          <div>
            <label htmlFor="ss_input">SS</label>
            <input
              type="file"
              className="ss_input"
              onChange={(e) => handleFileInput(e, "ss")}
              ref={inputTwoRef}
            ></input>
            {ss && <img src={ss} alt="ss" />}
            {ss && (
              <p
                style={{
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => cancelFileInput("ss")}
              >
                Clear
              </p>
            )}
          </div>
        </ShowcaseForm>
      </ShowcaseWrapper>
    </Container>
  );
};

export default NewShowCasePage;
