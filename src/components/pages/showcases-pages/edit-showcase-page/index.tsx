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
import { useNavigate, useParams } from "react-router-dom";
import {
  updateShowcase,
  validateCategoryPresent,
  viewShowcase,
} from "../../../../services/other-services/showcases-services";
import { FooterContent } from "../../pages-styles";
import {
  CatWrapper,
  PicInputWrapper,
} from "../create-new-showcase-page/styles";

interface IEditShowCaseProps {}

interface LimitedAttributes {
  title: string;
  showcase_type: string;
  site_link: string;
  year: string;
  client: string;
  role: string;
  ask: string;
  solution: string;
}
interface EditShowCasePayload {
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
}

type ParamRef = {
  id: string | undefined;
};

const EditShowCase: React.FunctionComponent<IEditShowCaseProps> = (props) => {
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
  const { id } = useParams<ParamRef>();
  const navigate = useNavigate();

  //states
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>("");
  const [ssUrl, setSsUrl] = React.useState<string>("");
  const [thumbnail, setThumbnail] = React.useState<string>();
  const [ss, setSs] = React.useState<string>();
  const [color1, setColor1] = React.useState<string>("");
  const [color2, setColor2] = React.useState<string>("");
  const [color3, setColor3] = React.useState<string>("");
  const [color4, setColor4] = React.useState<string>("");
  const [payload, setPayload] = React.useState<EditShowCasePayload>({
    title: "",
    showcase_type: "",
    site_link: "",
    year: "",
    client: "",
    role: "",
    ask: "",
    solution: "",
    showcase_categories: [],
    color_palette: [],
    thumbnail: null,
    ss: null,
  });
  const [oldCategories, setOldCategories] = React.useState<
    EditShowCasePayload["showcase_categories"]
  >([]);
  const [newCategories, setNewCategories] = React.useState<
    EditShowCasePayload["showcase_categories"]
  >([]);
  const [limitedAttr, setLimitedAttr] = React.useState<LimitedAttributes>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const [isUpdated, setIsUpdated] = React.useState<boolean>();

  async function getShowCaseData(id: string | undefined) {
    try {
      setIsLoading(true);
      const res = await viewShowcase(id);
      const {
        title,
        showcase_type,
        site_link,
        year,
        client,
        role,
        ask,
        solution,
        color_palette,
        showcase_categories,
        thumbnail_url,
        ss_url,
      } = res.data.showcase.data.attributes;

      setPayload((prev) => ({
        ...prev,
        title: title,
        showcase_type: showcase_type,
        site_link: site_link,
        year: year,
        client: client,
        role: role,
        ask: ask,
        solution: solution,
        color_palette: color_palette,
      }));
      setOldCategories(showcase_categories);
      thumbnail_url && setThumbnailUrl(thumbnail_url.url || "");
      ss_url && setSsUrl(ss_url.url || "");
      color_palette && setColor1(color_palette[0] || "");
      color_palette && setColor2(color_palette[1] || "");
      color_palette && setColor3(color_palette[2] || "");
      color_palette && setColor4(color_palette[3] || "");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
    }
  }

  function handleTextAreaChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  }

  //color inputs
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
      color_palette: [color1, color2, color3, color4],
    }));
  }, [color1, color2, color3, color4]);

  //file inputs
  function handleFileInput(
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ): void {
    if (!e.target.files) return;

    if (which === "thumbnail") {
      const file = e.target.files[0];

      if (file) {
        setThumbnail(URL.createObjectURL(file));
        setPayload((prev) => ({
          ...prev,
          thumbnail: file,
        }));
      }
    } else if (which === "ss") {
      const file = e.target.files[0];
      setSs(URL.createObjectURL(file));
      if (file) {
        setPayload((prev) => ({
          ...prev,
          ss: file,
        }));
      }
    }
  }

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

  //side effects
  React.useEffect(() => {
    if (id) {
      getShowCaseData(id);
      // console.log(limitedAttr);
    }
  }, [id]);

  React.useEffect(() => {
    setLimitedAttr((prevLimitedAttr) => ({
      ...prevLimitedAttr,
      title: payload.title,
      showcase_type: payload.showcase_type,
      site_link: payload.site_link,
      client: payload.client,
      role: payload.role,
      year: payload.year,
      ask: payload.ask,
      solution: payload.solution,
    }));
  }, [payload]);

  React.useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      showcase_categories: newCategories,
    }));
  }, [newCategories]);

  //checkbox
  function onCheckBoxClick(
    e: React.ChangeEvent<HTMLInputElement>,
    checkbox: string
  ): void {
    const isChecked = e.target.checked;

    if (isChecked) {
      setNewCategories((prev) => [...prev, checkbox]);
    } else {
      setNewCategories((prev) => prev.filter((pr) => pr !== checkbox));
    }
  }

  async function handleSubmit() {
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
      return setMessage("Please Select atleast one Category");
    }

    if (payload.color_palette.length === 0) {
      return setMessage("Please input atleast one color");
    }
    payload.color_palette
      .filter((n) => n)
      .forEach((color) => {
        formDataToSend.append("showcase[color_palette][]", color);
      });
    payload.showcase_categories.forEach((category) => {
      formDataToSend.append("showcase[showcase_categories][]", category);
    });
    if (payload.thumbnail)
      formDataToSend.append("showcase[thumbnail]", payload.thumbnail);
    if (payload.ss) {
      formDataToSend.append("showcase[ss]", payload.ss);
    }
    try {
      setIsLoading(true);
      const res = await updateShowcase(formDataToSend, id);
      setMessage(res.data.message);
      setIsUpdated(true);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      let fullError: string = "";
      if (error.response.data.full_errors) {
        error.response.data.full_errors.forEach((err: string) => {
          fullError += `${err}.
        `;
        });
        setMessage(error.response.data.error + " " + fullError);
      } else {
        setMessage("Something went wrong. Try again later.");
      }
      setIsLoading(false);
    }
  }

  //update func side effect
  React.useEffect(() => {
    if (isUpdated) {
      var navInterval = setInterval(() => {
        navigate(`/showcases/${id}`);
      }, 2000);
    }

    return () => {
      clearInterval(navInterval);
    };
  }, [isUpdated, id, navigate]);

  return (
    <Container>
      <StaticContent history="showcases" />
      <br />
      <div>
        <h4>Editing Showcase with id {id}</h4>
      </div>
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
      ) : (
        <>
          <ShowcaseWrapper>
            {attributes.map((attr: string, index: number) => {
              return (
                <FormAttribute
                  onChange={(e) => handleTextAreaChange(e)}
                  key={index}
                  attribute={attr}
                  value={
                    limitedAttr
                      ? limitedAttr[attr as keyof LimitedAttributes]
                      : ""
                  }
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
                  value={color1}
                  placeholder="color1"
                  onChange={(e) => onColorPaletteChange(e, "color1")}
                ></input>
                <input
                  type="text"
                  value={color2}
                  placeholder="color2"
                  onChange={(e) => onColorPaletteChange(e, "color2")}
                />
                <input
                  type="text"
                  value={color3}
                  placeholder="color3"
                  onChange={(e) => onColorPaletteChange(e, "color3")}
                />
                <input
                  type="text"
                  value={color4}
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
              <small>
                Currently Present: {oldCategories.map((cat) => cat + ", ")}{" "}
              </small>
              {checkboxValues.map((checkbox, index) => {
                return (
                  <div key={index}>
                    <label style={{ fontSize: "15px" }}>
                      <input
                        type="checkbox"
                        // checked={
                        //   payload
                        //     ? payload?.showcase_categories.includes(checkbox)
                        //     : false
                        // }
                        name={checkbox}
                        onChange={(e) => onCheckBoxClick(e, checkbox)}
                      />
                      {checkbox}
                    </label>
                    <br />
                  </div>
                );
              })}
              {!validateCategoryPresent(payload.showcase_categories) ? (
                <p style={{ color: "red" }}>Must Select One </p>
              ) : null}
              <small>
                Changing to:
                {newCategories.map((cat) => cat + ", ")}{" "}
              </small>
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
                <br />
                {/* {isUpdated ? (
                  <small>Recently Updated: </small>
                ) : (
                  <small>Currently Present: </small>
                )} */}
                {thumbnailUrl ? (
                  <div>
                    <small>Currently Present: </small>
                    <img src={thumbnailUrl} alt="thumbnail" />
                  </div>
                ) : null}
                {thumbnail ? (
                  <div>
                    <small>Changing to: </small>
                    <img src={thumbnail} alt="thumbnail" />
                  </div>
                ) : null}

                {/* {thumbnail && <img src={thumbnail} alt="thumbnail" />} */}
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
              <br />
              <div>
                <label htmlFor="ss_input">SS: </label>
                <input
                  type="file"
                  className="ss_input"
                  onChange={(e) => handleFileInput(e, "ss")}
                  ref={inputTwoRef}
                ></input>
                <br />
                {/* {isUpdated ? (
                  <small>Recently Updated: </small>
                ) : (
                  <small>Currently Present: </small>
                )} */}
                {ssUrl ? (
                  <div>
                    <small>Currently Present: </small>
                    <img src={ssUrl} alt="thumbnail" />
                  </div>
                ) : null}
                {ss ? (
                  <div>
                    <small>Changing to: </small>
                    <img src={ss} alt="thumbnail" />
                  </div>
                ) : null}
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
        </>
      )}
      <br />
      <br />
      <FooterContent />
    </Container>
  );
};

export default EditShowCase;
