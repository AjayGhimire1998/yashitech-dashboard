import * as React from "react";
import {
  Button,
  Container,
  FormAttribute,
  LoadingSpinner,
  Message,
} from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";
import {
  createNewShowcase,
  validateCategoryPresent,
} from "../../../../services/other-services/showcases-services";
import { useNavigate } from "react-router-dom";
import { CatWrapper, PicInputWrapper } from "./styles";
import { FooterContent } from "../../pages-styles";

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
    color_palette: string[];
    showcase_categories: string[];
    thumbnail: Blob | null;
    ss: Blob | null;
  };
};

type AttributeKeys = {
  title: string;
  showcase_type: string;
  site_link: string;
  year: string;
  client: string;
  role: string;
  ask: string;
  solution: string;
};

type MessageType = {
  message?: string;
  error?: string;
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
  const [color1, setColor1] = React.useState<string>("");
  const [color2, setColor2] = React.useState<string>("");
  const [color3, setColor3] = React.useState<string>("");
  const [color4, setColor4] = React.useState<string>("");
  const [payload, setPayload] = React.useState<NewShowCasePayload["showcase"]>({
    title: "",
    showcase_type: "",
    site_link: "",
    year: "",
    client: "",
    role: "",
    ask: "",
    solution: "",
    color_palette: [],
    showcase_categories: [],
    thumbnail: null,
    ss: null,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<MessageType>({
    error: "",
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
  //handling color_palette_inputs

  const onColorPaletteChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const { value } = e.target;
    if (inputName === "color1") {
      setColor1(value);
    } else if (inputName === "color2") {
      setColor2(value);
    } else if (inputName === "color3") {
      setColor3(value);
    } else if (inputName === "color4") {
      setColor4(value);
    }
  };

  React.useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      color_palette: [color1, color2, color3, color4].filter((n) => n),
    }));
  }, [color1, color2, color3, color4]);

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
    // localStorage.setItem("create", JSON.stringify(payload));
    const formDataToSend = new FormData();
    formDataToSend.append("showcase[title]", payload.title);
    formDataToSend.append("showcase[showcase_type]", payload.showcase_type);
    formDataToSend.append("showcase[site_link]", payload.site_link);
    formDataToSend.append("showcase[year]", payload.year);
    formDataToSend.append("showcase[client]", payload.client);
    formDataToSend.append("showcase[ask]", payload.ask);
    formDataToSend.append("showcase[solution]", payload.solution);
    formDataToSend.append("showcase[role]", payload.role);
    if (payload.showcase_categories.length === 0) {
      return setMessage((prev) => ({
        ...prev,
        error: "Please select atleast one category.",
      }));
    }
    if (payload.color_palette.length === 0) {
      return setMessage((prev) => ({
        ...prev,
        error: "Please input atleast one color.",
      }));
    }
    payload.showcase_categories.forEach((category) => {
      formDataToSend.append("showcase[showcase_categories][]", category);
    });
    payload.color_palette.forEach((color) => {
      formDataToSend.append("showcase[color_palette][]", color);
    });
    if (payload.thumbnail)
      formDataToSend.append("showcase[thumbnail]", payload.thumbnail);
    if (payload.ss) {
      formDataToSend.append("showcase[ss]", payload.ss);
    }

    try {
      setIsLoading(true);
      const res = await createNewShowcase(formDataToSend);
      setMessage((prevMessage) => ({
        ...prevMessage,
        message: res.data.message,
      }));
      setNewId(res.data.showcase.data.id);
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      // console.log(error);
      let fullError: string = "";
      if (error.response.data.full_errors) {
        error.response.data.full_errors.forEach((err: string) => {
          fullError += `${err}.
        `;
        });
        setMessage((prevMessage) => ({
          ...prevMessage,
          error: error.response.data.error + fullError,
        }));
      } else {
        setMessage((prev) => ({
          ...prev,
          error: "Something went wrong. Please try again later.",
        }));
      }
      setIsLoading(false);
      // console.log(fullError);
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
  }, [newId, navigate]);

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
            setMessage({ message: "", error: "" });
          }}
        >
          {message.message || message.error}
        </Message>
      ) : null}
      <br />
      {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : (
        <>
          <ShowcaseWrapper>
            {attributes.map((attr: string, index: number) => {
              return (
                <FormAttribute
                  key={index}
                  attribute={attr}
                  onChange={(e) => handleTextAreaChange(e)}
                  // onClick={handleSubmit}
                  // value={payload.attr}
                  value={payload[attr as keyof AttributeKeys]}
                />
              );
            })}
            <br />
            <CatWrapper>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "400px",
                }}
              >
                <label htmlFor="color_palette_inputs">Color_Palette:</label>
                <input
                  type="text"
                  value={undefined}
                  placeholder="color1"
                  onChange={(e) => onColorPaletteChange(e, "color1")}
                ></input>
                <input
                  type="text"
                  value={undefined}
                  placeholder="color2"
                  onChange={(e) => onColorPaletteChange(e, "color2")}
                />
                <input
                  type="text"
                  value={undefined}
                  placeholder="color3"
                  onChange={(e) => onColorPaletteChange(e, "color3")}
                />
                <input
                  type="text"
                  value={undefined}
                  placeholder="color4"
                  onChange={(e) => onColorPaletteChange(e, "color4")}
                />
              </div>
              <br />
            </CatWrapper>
            <CatWrapper>
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
              {!validateCategoryPresent(payload.showcase_categories) ? (
                <p style={{ color: "red" }}>Must Select One </p>
              ) : null}
            </CatWrapper>
            <br />
            <PicInputWrapper>
              <div>
                <label htmlFor="thumbnail_input">Thumbnail: </label>
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
                <label htmlFor="ss_input">SS: </label>
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
            </PicInputWrapper>
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
          <br />
          <br />
          <FooterContent />
        </>
      )}
    </Container>
  );
};

export default NewShowCasePage;
