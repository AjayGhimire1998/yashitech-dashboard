import * as React from "react";
import { Button, Container, FormAttribute } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";
import { useNavigate, useParams } from "react-router-dom";
import { updateShowcase, viewShowcase } from "../../../../services/other-services/showcases-services";
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
  categories: string[];
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
    categories: [],
    thumbnail: null,
    ss: null,
  });
  const [limitedAttr, setLimitedAttr] = React.useState<LimitedAttributes>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();

  async function getShowCaseData(id: string | undefined) {
    try {
      const res = await viewShowcase(id);
      // console.log(res.data);
      const {
        title,
        showcase_type,
        site_link,
        year,
        client,
        role,
        ask,
        solution,
        categories,
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
        categories: categories,
      }));
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
    payload.categories.forEach((category) => {
      formDataToSend.append("showcase[categories][]", category);
    });
    if (payload.thumbnail)
      formDataToSend.append("showcase[thumbnail]", payload.thumbnail);
    if (payload.ss) {
      formDataToSend.append("showcase[ss]", payload.ss);
    }

    console.log("formData: " + formDataToSend );
    
    try{
      setIsLoading(true);
      const res = await updateShowcase(formDataToSend, id);
      console.log(res.data);
      
      setMessage(res.data.message);
      if(message){
        setInterval(()=>{
          navigate(`/showcases/${id}`);
        }, 2000)
      }
    } catch(error: any){
      console.log(error);
      let fullError: string = "";
      error.response.data.full_errors.forEach((err: string) => {
        fullError += `${err}.
        `;
      });
      setMessage(error.response.data + ", " + fullError)
    }
  }

  function handleFileInput(
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ): void {
    if (!e.target.files) return;

    if (which === "thumbnail") {
      const file = e.target.files[0];
      setThumbnail(URL.createObjectURL(file));
      if (file) {
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
    // console.log(payload);
  }, [payload]);

  return (
    <Container>
      <StaticContent history="showcases" />
      <br />
      <br />
      <ShowcaseWrapper>
        {attributes.map((attr: string, index: number) => {
          return (
            <FormAttribute
              onChange={(e) => handleTextAreaChange(e)}
              key={index}
              attribute={attr}
              value={
                limitedAttr ? limitedAttr[attr as keyof LimitedAttributes] : ""
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
                    categories: [...prev.categories, checkbox],
                  };
                } else {
                  return {
                    ...prev,
                    categories: prev.categories.filter(
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
                      payload ? payload?.categories.includes(checkbox) : false
                    }
                    name={checkbox}
                    onChange={(e) => onCheckBoxClick(e, checkbox)}
                  />
                  {checkbox}
                </label>
              </div>
            );
          })}
          {/* <div>
              <p>Selected Categories: {selectedCategories + " "}</p>
            </div> */}
        </CatWrapper>
        <br />
        <PicInputWrapper>
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
          <br />
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
    </Container>
  );
};

export default EditShowCase;
