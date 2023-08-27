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
  color_palette: string[],
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
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>();
  const [ssUrl, setSsUrl] = React.useState<string>();
  const [thumbnail, setThumbnail] = React.useState<string>();
  const [ss, setSs] = React.useState<string>();
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
  const [limitedAttr, setLimitedAttr] = React.useState<LimitedAttributes>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const [isUpdated, setIsUpdated] = React.useState<boolean>();

  async function getShowCaseData(id: string | undefined) {
    try {
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
        showcase_categories: showcase_categories,
      }));
      setThumbnailUrl(thumbnail_url.url);
      setSsUrl(ss_url.url);
    } catch (error) {
      console.log(error);
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
    console.log(payload);
  }, [payload]);

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
      console.log(res.data);

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
              <label htmlFor="showcase_categories_input">
                Showcase_Categories:
              </label>

              {checkboxValues.map((checkbox, index) => {
                function onCheckBoxClick(
                  e: React.ChangeEvent<HTMLInputElement>,
                  checkbox: string
                ): void {
                  const isChecked = e.target.checked;

                  setPayload((prev) => {
                    if (isChecked) {
                      return {
                        ...prev,
                        showcase_categories: [...prev.showcase_categories, checkbox],
                      };
                    } else {
                      return {
                        ...prev,
                        categories: prev.showcase_categories.filter(
                          (cat) => cat !== checkbox
                        ),
                      };
                    }
                  });
                }

                return (
                  <div key={index}>
                    <label style={{ fontSize: "15px" }}>
                      <input
                        type="checkbox"
                        checked={
                          payload
                            ? payload?.showcase_categories.includes(checkbox)
                            : false
                        }
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
